# -*- coding: utf-8 -*-

from flaks import render_template
from flask.views import MethodView

class Index(MethodView):
    ''' Se encarga de renderar el index una vez que el usuario ya se pudo
    loguear correctamente.
    '''

    def get(self):
        return render_template('index.html')
