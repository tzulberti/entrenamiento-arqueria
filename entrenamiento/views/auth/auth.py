# -*- coding: utf-8 -*-

''' Tiene todas las views relacionados al tema de auth del usuario.
'''

from flask import request, redirect, url_for, render_template, session
from flask.views import MethodView

from entrenamiento.app.app import bcrypt
from entrenamiento.models.user import Usuario
from entrenamiento.views.utils import LoggedUserData

class LoginView(MethodView):
    ''' Se encarga de loguear al usuario y de meterlo al mismo
    en session.
    '''

    def get(self):
        return render_template('login.html',
                               username=None,
                               password=None)

    def post(self):
        username = request.form.get('username')
        password = request.form.get('password')

        query = Usuario.query
        query = query.filter(Usuario.username == username)
        user = query.first()
        if not user:
            return render_template('login.html',
                                    username=username or " ",
                                    password=password)
        else:
            if bcrypt.check_password_hash(user.password, password):
                logged_user_data = LoggedUserData(user.id,
                                                  user.username,
                                                  user.nombre,
                                                  user.apellido,
                                                  user.es_entrenador,
                                                  user.es_administrador)
                session['logged_user'] = logged_user_data
                return redirect(request.args.get('next') or url_for('index'))
            else:
                return render_template('login.html',
                                        username=username or " ",
                                        password=password)

