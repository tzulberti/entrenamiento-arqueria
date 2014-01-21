# -*- coding: utf-8 -*-

from flask import redirect, url_for, session
from flask.views import MethodView

class LogoutView(MethodView):
    ''' Se encarga de desloguear al usuario.

    En caso de que el usuario no este logueado entonces lo va a
    dirigir a la pagina de login.
    '''

    def get(self):
        if 'logged_user' in session:
            del session['logged_user']
        return redirect(url_for('auth.login'))



