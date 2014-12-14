# -*- coding: utf-8 -*-

''' Tiene todas las views relacionados al tema de auth del usuario.
'''

from flask import request, redirect, url_for, render_template, session
from flask.views import MethodView

from entrenamiento.app.app import bcrypt
from entrenamiento.models.arquero import Arquero
from entrenamiento.models.usuario import Usuario
from entrenamiento.models.permiso import Permiso, PermisoUsuario
from entrenamiento.views.utils import LoggedUserData

class LoginView(MethodView):
    ''' Se encarga de loguear al usuario y de meterlo al mismo
    en session.
    '''

    def get(self):
        return render_template('login.html',
                               email=None,
                               password=None)

    def post(self):
        email = request.form.get('email')
        password = request.form.get('password')

        query = Usuario.query
        query = query.join(Arquero)
        query = query.filter(Arquero.email == email)
        user = query.first()
        if not user:
            return render_template('login.html',
                                    email=email or " ")
        else:
            if bcrypt.check_password_hash(user.password, password):
                # tengo que buscar todos los permisos que tiene el usuario
                # en cuestion
                query = Permiso.query
                query = query.join(PermisoUsuario)
                query = query.join(Usuario)
                query = query.filter(Usuario.id == user.id)
                permisos = query.all()
                logged_user_data = LoggedUserData(user.id,
                                                  user.arquero.email,
                                                  user.arquero.nombre,
                                                  user.arquero.apellido,
                                                  user.es_administrador,
                                                  [p.value for p in permisos])
                session['logged_user'] = logged_user_data
                return redirect(request.args.get('next') or url_for('index'))
            else:
                return render_template('login.html',
                                        email=email or " ")

