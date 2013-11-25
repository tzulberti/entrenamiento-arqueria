# -*- coding: utf-8  -*-

from flask.views import MethodView
from flask import request, jsonify




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
        data = self.model_class.query.all()
        res = [d.to_json() for d in data]
        return jsonify(values=res)

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


