# -*- coding: utf-8  -*-

from flask import jsonify, request, session
from flask.views import MethodView

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

    '''

    def __init__(self, db, model_class, form_class):
        super(BaseModelListCrudView, self).__init__()
        self.model_class = model_class
        self.form_class = form_class
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

        if 'orderBy' in request.args:
            order_by = request.args['orderBy']
            if order_by:
                column = getattr(self.model_class, order_by)
                order_direction = request.args.get('orderDirection', 'ASC')
                if order_direction == 'DESC':
                    query = query.order_by(column.desc())
                else:
                    query = query.order_by(column)


        # entones de setear el tema de los limit, me fijo el tema
        # de los filtros de las cosas que puede ver el usuario.
        filter_index = 0
        filters_data = request.args.getlist('filters[]')
        for filter_data in filters_data:
            table_name, column_name, operator, value = filter_data.split('|')

            column = getattr(self.model_class, column_name)
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
            else:
                raise Exception('Todavia me falta manejar este caso')
            filter_index +=1



        # ahora solo tengo que filtrar por el usuario correspondiente.
        # en caso de que el usuario logueado no sea entrenador o
        # administrador entonces solo va a poder ver su informacion
        if hasattr(self.model_class, 'id_usuario'):
            logged_user = LoggedUserData(*session['logged_user'])
            if not (logged_user.es_entrenador or logged_user.es_administrador):
                query = query.filter(getattr(self.model_class, 'id_usuario') == logged_user.id)

        if not 'fkInformation' in request.args:
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
            res = [dict(id=d.id, value=str(d)) for d in query.all()]
        else:
            res = [d.to_json() for d in query.all()]

            # ahora me tengo que fijar cuantos existen en la base de datos
            # en total y cuantos existen cuando se aplican los filtros
            total_count = self.model_class.query.count()

        return jsonify(values=res,
                       totalCount=total_count,
                       filterCount=filter_count)

    def post(self):
        ''' Esto es llamadao cuando el usuario quiere crear una instancia.
        '''
        form = self.form_class(self.model_class)

        if form.validate_on_submit():
            # si tiene el usuario, entonces se lo tengo que agregar.
            if hasattr(self.model_class, 'id_usuario'):
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
        self.db.session.delete(data)
        self.db.session.commit()
        return jsonify(id=data.id)


