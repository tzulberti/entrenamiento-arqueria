# -*- coding: utf-8  -*-

from flask import jsonify, request
from flask.views import MethodView
from sqlalchemy import func

class BaseModelListCrudView(MethodView):
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

        if 'limit' in request.args:
            limit = int(request.args['limit'])
            query = query.limit(limit)

        if 'offset' in request.args:
            offset = int(request.args['offset'])
            query = query.offset(offset)


        res = [d.to_json() for d in query.all()]

        # ahora me tengo que fijar cuantos existen en la base de datos
        # en total y cuantos existen cuando se aplican los filtros
        total_count = self.model_class.query.count()
        filter_count = total_count

        return jsonify(values=res,
                       totalCount=total_count,
                       filterCount=filter_count)

    def post(self):
        ''' Esto es llamadao cuando el usuario quiere crear una instancia.
        '''
        form = self.form_class(self.model_class)
        if form.validate_on_submit():
            self.db.session.add(form.instance)
            self.db.session.commit()
            return jsonify(id=form.instance.id)
        else:
            return jsonify(form.errors), 400


class BaseModelCrudView(MethodView):
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
        self.model_class = model_class
        self.form_class = form_class
        self.db = db

    def get(self, object_id):
        query = self.model_class.query.filter(self.model_class.id == object_id)
        data = query.first()
        if not data:
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


