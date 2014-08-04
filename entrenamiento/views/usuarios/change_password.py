# -*- coding: utf-8 -*-

from flask import redirect, url_for, request, render_template

from entrenamiento.models.arquero import Arquero
from entrenamiento.models.usuario import Usuario
from entrenamiento.views.base import UserRequiredView
from entrenamiento.views.usuarios.form import ChangePasswordForm
from entrenamiento.views.utils import get_logged_user_data

class ChangePasswordView(UserRequiredView):
    ''' Se encarga de desloguear al usuario.

    En caso de que el usuario no este logueado entonces lo va a
    dirigir a la pagina de login.
    '''

    def __init__(self, db, bcrypt):
        self.db = db
        self.bcrypt = bcrypt

    def get(self):
        return render_template('change_password.html',
                               form=ChangePasswordForm(),
                               invalid_password=False)

    def post(self):
        form = ChangePasswordForm(request.form)
        if form.validate():
            # tengo que buscar el usuario correspondiente y chequear
            # que el password sea el correcto
            logged_user = get_logged_user_data()
            query = Usuario.query
            query = query.join(Arquero)
            query = query.filter(Arquero.email == logged_user.email)
            user = query.first()
            if not user:
                raise Exception('El usuario no existe pero el mismo estaba logueado')
            if self.bcrypt.check_password_hash(user.password, form.password.data):
                user.password = self.bcrypt.generate_password_hash(form.new_password.data)
                self.db.session.add(user)
                self.db.session.commit()

                return redirect(url_for('auth.logout'))
            else:
                return render_template('change_password.html',
                                       form=form,
                                       invalid_password=True)

        else:
            return render_template('change_password.html',
                                   form=form,
                                   invalid_password=False)


