# -*- coding: utf-8 -*-

from flask import render_template, session, redirect, url_for
from flask.views import MethodView

class IndexViewTemplate(MethodView):
    ''' Se encarga de renderar el index una vez que el usuario ya se pudo
    loguear correctamente.

    :param dict forms_data: tiene la clase de los forms, y como es que los
                            mismos se tienen que crear
    '''

    def __init__(self, **forms_data):
        super(IndexViewTemplate, self).__init__()
        self.forms_data = forms_data

    def get(self):
        if 'logged_user' in session:
            forms = dict()
            for form_name, form_aux in self.forms_data.items():
                forms[form_name] = form_aux['klass'](*form_aux['args'])
            return render_template('index.html',
                                   **forms)
        else:
            return redirect(url_for('auth.login'))

