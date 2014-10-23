# -*- coding: utf-8  -*-

from datetime import date, datetime

from flask import jsonify, request, session
from flask.views import MethodView
from sqlalchemy import func
from sqlalchemy.exc import IntegrityError

from entrenamiento.views.utils import LoggedUserData
from entrenamiento.views.decorators import user_required


class BaseEntrenamientoView(MethodView):
    ''' Clase base desde la cual todas las views tienen que extender.
    '''
    pass


class UserRequiredView(BaseEntrenamientoView):

    decorators = [user_required]


class BaseModelListCrudView(UserRequiredView):
    ''' Clase base para todas las views que tengan que manejar el
    tema de no trabajar puntualmente con una instancia.

    Esto basicamente puede pasar en dos casos:

    1. Cuando se lista todos los valores que existen en la base
       de datos.

    2. Cuando se crea una instancia del nuevo objeto. En este
       caso, se esta trabajando con una nueva instancia pero el
       objeto creado todavia no tiene un ID por lo que no se puede
       llamar a la URL correspondiente.


    :param db: la instancia de la applicacion db que se encarga de
               manejar todo el tema de sessiones

    :param model_class: la clase con la que va a trabajar esta view
                        para leer toda la informacion.

    :param form_class: la clase que se va a usar para validar la
                       creacion de la instancia.

    :param related_classes: es un diccionario con el nombre de las
                            clases y la instancia de la misma con la
                            cual esta clase tiene alguna relacion.

    '''

    def __init__(self, db, model_class, form_class, related_classes=dict()):
        super(BaseModelListCrudView, self).__init__()
        self.model_class = model_class
        self.form_class = form_class
        self.related_classes = related_classes
        self.db = db

    def get(self):
        ''' Se encarga de obtener todos los valores que hay en
        la base de datos teniendo en cuenta que:

        - la informacion se devuelve de forma paginada asique
          de request llega un limit y offset
        - la informacion puede estar ordenada por alguna columna
          espeficiada en el request. Si es ascendenete o descendente
          tambien esta indicado en el request.
        - Pueden existir diferentes filtros para la informacion.

        Existe un parametro que es para un caso especial:

        fkInformation:
            en este caso se quiere obtener toda la informacion de la
            tabla teniendo en cuenta que se lo va a usar para mostrar
            el valor que es referenciado de otra tabla. Por lo tanto,
            lo que se quiere en la respuesta son dos valores:

            - id: el id del objecto en cuestion.
            - value: el str del modelo en cuestion.


        Los filtros tienen que tener el siguiente formato:

        ::

            f-0=tableName;columnName;operator;value

        donde:

        tableName:
            es el nombre de la tabla por la que se quiere filtrar

        operator:
            es el operador por el que se quiere filtrar. Este viene dado
            en formato html, y se lo tiene que traducir al operador
            correspondiente. Por ejemplo: si el valor es eq entonces
            en la query se lo tiene que poner como "="

        value:
            es el valor por el que se quiere filtrar la informacion.

        '''
        query = self.model_class.query
        sqlalchemy_columns = []
        if 'join' in request.args:
            # tengo que decirle antes de mano el tema del join
            # porque si despues le especifico las columnas no me deja
            # hacerlo
            join = request.args['join']
            query = query.join(self.related_classes[join])

        if 'columns[]' in request.args:
            columns = request.args.getlist('columns[]')
            for column_name in columns:
                aggregation_name = None
                if '(' in column_name:
                    aggregation_name = column_name[:column_name.index('(')]
                    aggregation_name = aggregation_name.lower()
                    column_name = column_name[column_name.index('(') + 1: column_name.index(')')]

                column = self._get_attribute(column_name)
                if aggregation_name:
                    if aggregation_name == 'month':
                        sqlalchemy_columns.extend([
                            func.extract('year', column),
                            func.extract('month', column)
                        ])
                        continue
                    else:
                        column = getattr(func, aggregation_name)(column)
                sqlalchemy_columns.append(column)

            query = query.with_entities(*sqlalchemy_columns)



        if 'orderBy' in request.args:
            order_by = request.args['orderBy']
            if order_by:
                column = self._get_attribute(order_by)
                order_direction = request.args.get('orderDirection', 'ASC')
                if order_direction == 'DESC':
                    query = query.order_by(column.desc())
                else:
                    query = query.order_by(column)


        if 'groupBy' in request.args:
            group_by = request.args['groupBy']
            if group_by:
                aggregation_name = None
                if '(' in group_by:
                    aggregation_name = group_by[:group_by.index('(')]
                    aggregation_name = aggregation_name.lower()
                    group_by = group_by[group_by.index('(') + 1: group_by.index(')')]

                column = self._get_attribute(group_by)
                if aggregation_name:
                    if aggregation_name == 'month':
                        query = query.group_by(func.extract('year', column))
                        query = query.group_by(func.extract('month', column))
                    else:
                        raise Exception('Todavia no implemente este caso')
                else:
                    query = query.group_by(column)

        # entones de setear el tema de los limit, me fijo el tema
        # de los filtros de las cosas que puede ver el usuario.
        filter_index = 0
        filters_data = request.args.getlist('filters[]')
        for filter_data in filters_data:
            table_name, column_name, operator, value = filter_data.split('|')

            column = self._get_attribute(column_name)
            if operator == 'eq':
                query = query.filter(column == value)
            elif operator == 'lt':
                query = query.filter(column < value)
            elif operator == 'let':
                query = query.filter(column <= value)
            elif operator == 'gt':
                query = query.filter(column > value)
            elif operator == 'get':
                query = query.filter(column >= value)
            elif operator == 'in':
                query = query.filter(column.in_(value.split(',')))
            elif operator == 'neq':
                query = query.filter(column != value)
            elif operator == 'not_null':
                query = query.filter(column.isnot(None))
            else:
                raise Exception('Todavia me falta manejar este caso')
            filter_index +=1



        # ahora solo tengo que filtrar por el usuario correspondiente.
        # en caso de que el usuario logueado no sea entrenador o
        # administrador entonces solo va a poder ver su informacion
        if hasattr(self.model_class, 'id_usuario'):
            logged_user = LoggedUserData(*session['logged_user'])
            if not logged_user.es_administrador:
                query = query.filter(getattr(self.model_class, 'id_usuario') == logged_user.id)

        if (not 'fkInformation' in request.args) and (not 'columns[]' in request.args):
            # esto lo tengo que poner antes del limit y offset porque sino
            # el count va a tener en cuenta esas cosas
            filter_count = query.count()

        if 'limit' in request.args:
            limit = int(request.args['limit'])
            query = query.limit(limit)

        if 'offset' in request.args:
            offset = int(request.args['offset'])
            query = query.offset(offset)

        if 'fkInformation' in request.args:
            total_count = 0
            filter_count = 0
            if hasattr(self.model_class, 'to_fk_information'):
                res = [d.to_fk_information() for d in query.all()]
            else:
                res = [dict(id=d.id, value=unicode(d)) for d in query.all()]
        elif 'columns[]' in request.args:
            total_count = 0
            filter_count = 0
            res = [d for d in query.values(*sqlalchemy_columns)]
            # ahora me tengo que asegurar que todos los valores que uso
            # sean serializables
            tmp_res = []
            for values in res:
                tmp_values = []
                for column_value in values:
                    if isinstance(column_value, (date, datetime)):
                        column_value = column_value.strftime('%d/%m/%Y')
                    tmp_values.append(column_value)
                tmp_res.append(tmp_values)
            res = tmp_res
        else:
            res = [d.to_json() for d in query.all()]

            # ahora me tengo que fijar cuantos existen en la base de datos
            # en total y cuantos existen cuando se aplican los filtros
            total_count = self.model_class.query.count()

        return jsonify(values=res,
                       totalCount=total_count,
                       filterCount=filter_count)


    def _get_attribute(self, attribute_name):
        ''' Se encarga de obtener el attributo de la clase correspondiente
        teniendo en cuenta que el attributo no puede corresponder al modelo
        sino que a una de las clases relacionadas.
        '''
        if '.' in attribute_name:
            class_name, attribute_name = attribute_name.split('.')
            return getattr(self.related_classes[class_name], attribute_name)
        else:
            return getattr(self.model_class, attribute_name)


    def post(self):
        ''' Esto es llamadao cuando el usuario quiere crear una instancia.
        '''
        form = self.form_class(self.model_class)

        if form.validate_on_submit():
            # si tiene el usuario, entonces se lo tengo que agregar.
            if hasattr(self.model_class, 'id_usuario'):
                if form.instance.id_usuario is None:
                    logged_user = LoggedUserData(*session['logged_user'])
                    form.instance.id_usuario = logged_user.id
            self.db.session.add(form.instance)
            self.db.session.commit()
            return jsonify(id=form.instance.id)
        else:
            return jsonify(form.errors), 400


class BaseModelCrudView(UserRequiredView):
    ''' Clase base para todas las views que tengan que ver
    con el tema de CRUD (Create, Read, Update, Delete)

    A diferencia de :class:`.BaseModelListCrudView`, en este caso
    es el CRUD para una unica instancia. Esto se puede ver en 3
    casos posibles:

    1. Se esta viendo el detalle de una instancia.

    2. Se esta borrando una instancia.

    3. Se esta actualizando una instancia en particular.

    :param model: la clase del modelo con la que se va a trabajar
                  para validar los datos de la misma.
    '''

    def __init__(self, db, model_class, form_class):
        super(BaseModelCrudView, self).__init__()
        self.model_class = model_class
        self.form_class = form_class
        self.db = db

    def get(self, object_id):
        query = self.model_class.query.filter(self.model_class.id == object_id)
        data = query.first()
        if not data:
            # TODO ver que hacer...
            return 'Ver mas adelante', 500
        res = data.to_json()
        return jsonify(res)


    def put(self, object_id):
        form = self.form_class(self.model_class, object_id)
        if form.validate_on_submit():
            self.db.session.add(form.instance)
            self.db.session.commit()
            return jsonify(id=form.instance.id)
        else:
            return jsonify(form.errors), 400

    def delete(self, object_id):
        query = self.model_class.query.filter(self.model_class.id == object_id)
        data = query.first()
        if not data:
            # TODO tengo que ver que hacer en este caso
            return 'Ver mas adelante', 500
        try:
            self.db.session.delete(data)
            self.db.session.commit()
        except IntegrityError, e:
            # en este caso esta intentando de actualizar la informacion de la
            # tabla, pero no se la puede actualizar porque el valor FK no
            # puede ser Null
            table_name = e.statement[0: e.statement.index(' SET ')]
            table_name = table_name.replace('UPDATE', '')
            table_name = table_name.strip()
            return jsonify(error='No se puede borrar el valor porque en %s '\
                                 'existe un dato que lo usa. Primero se tiene '\
                                 'que borrar los mismos' % table_name), 500

        return jsonify(id=data.id)


