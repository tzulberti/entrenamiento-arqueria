# -*- coding: utf-8 -*-

from flask import render_template
from flask.views import MethodView

from entrenamiento.models.lugar import Lugar
from entrenamiento.views.base import BaseCrudView


class TemplateLugarView(MethodView):

    def get(self):
        return render_template('lugar.html')

class LugarView(BaseCrudView):

    def __init__(self):
        super(LugarView, self).__init__(Lugar)
