# -*- coding: utf-8 -*-

from flask import render_template
from flask.views import MethodView

from entrenamiento.app.app import db
from entrenamiento.models.lugar import Lugar
from entrenamiento.views.base import BaseModelListCrudView, BaseModelCrudView
from entrenamiento.views.lugares.form import LugarForm


class LugarCrudTemplate(MethodView):
    ''' Se encarga de renderar el index una vez que el usuario ya se pudo
    loguear correctamente.
    '''

    def get(self):
        return render_template('crud/lugares.html')

class LugarListCrudView(BaseModelListCrudView):

    def __init__(self):
        super(LugarListCrudView, self).__init__(db, Lugar, LugarForm)

class LugarModelCrudView(BaseModelCrudView):

    def __init__(self):
        super(LugarModelCrudView, self).__init__(db, Lugar, LugarForm)

