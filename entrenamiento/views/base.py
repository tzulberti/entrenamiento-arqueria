# -*- coding: utf-8  -*-

from flask.views import MethodView
from flask import request

class BaseCrudView(MethodView):
    ''' Clase base para todas las views que tengan que ver
    con el tema de CRUD (Create, Read, Update, Delete)


    :param model: la clase del modelo con la que se va a trabajar
                  para validar los datos de la misma.
    '''

    def __init__(self, model_class):
        self.model_class = model_class

    def get(self):
        data = self.model_class.query.all()
        res = [d.to_json() for d in data]
        return res


    def post(self):
        model_instance = self.model_class.from_form_data(request.form)
        pass

