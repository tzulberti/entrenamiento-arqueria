# -*- coding: utf-8 -*-


from entrenamiento.models.lugares.lugar import Lugar
from entrenamiento.views.base import BaseCrudView

class LugarView(BaseCrudView):

    def __init__(self):
        super(LugarView, self).__init__(Lugar)
