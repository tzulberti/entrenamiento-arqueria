# -*- coding: utf-8 -*-

from entrenamiento.views.base import BaseModelListCrudView, BaseModelCrudView
from entrenamiento.models.lugar import Lugar

from flask import render_template
from flask.views import MethodView

class LugarCrudTemplate(MethodView):
    ''' Se encarga de renderar el index una vez que el usuario ya se pudo
    loguear correctamente.
    '''

    def get(self):
        return render_template('crud/lugares.html')

class LugarListCrudView(BaseModelListCrudView):

    def __init__(self):
        super(LugarListCrudView, self).__init__(Lugar)

class LugarModelCrudView(BaseModelCrudView):

    def __init__(self):
        super(LugarModelCrudView, self).__init__(Lugar)

