# -*- coding: utf-8 -*-

from flask import render_template, session, redirect, url_for
from flask.views import MethodView

from entrenamiento.models.arco import ArcoRecurvado
from entrenamiento.views.arcos.form import ArcoRecurvadoForm

class IndexViewTemplate(MethodView):
    ''' Se encarga de renderar el index una vez que el usuario ya se pudo
    loguear correctamente.
    '''

    def get(self):
        if 'logged_user' in session:
            return render_template('index.html',
                                    arco_recurvado_form=ArcoRecurvadoForm(ArcoRecurvado))
        else:
            return redirect(url_for('auth.login'))

