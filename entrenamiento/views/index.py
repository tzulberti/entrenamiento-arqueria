# -*- coding: utf-8 -*-

from flask import render_template

from entrenamiento.views.base import BaseEntrenamientoView

class IndexViewTemplate(BaseEntrenamientoView):
    ''' Se encarga de renderar el index una vez que el usuario ya se pudo
    loguear correctamente.
    '''

    def get(self):
        return render_template('index.html')
