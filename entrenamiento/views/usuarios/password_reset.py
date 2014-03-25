# -*- coding: utf-8 -*-

from flask import request, render_template
from flask.views import MethodView

from entrenamiento.app.app import bcrypt
from entrenamiento.models.usuario import Usuario
from entrenamiento.utils import random_text

class PasswordResetView(MethodView):
    ''' Se encarga de cambiar el password del usuario y mandarselo por mail.
    '''

    def __init__(self, db, mail_sender):
        self.db = db
        self.mail_sender = mail_sender

    def get(self):
        return render_template('password_reset.html',
                               cambiado=False,
                               no_existe=False)

    def post(self):
        email = request.form.get('email')

        query = Usuario.query
        query = query.filter(Usuario.email == email)
        user = query.first()
        if user:
            password = random_text()
            encripted_password = bcrypt.generate_password_hash(password)
            user.password = encripted_password
            self.mail_sender.send_mail([user.email],
                                       'Nuevo password Sistema EDA',
                                       'El nuevo password para poder loguearte al sistema es: %s' % password)
            self.db.session.add(user)
            self.db.session.commit()
            return render_template('password_reset.html',
                                   cambiado=True,
                                   no_existe=False)
        else:
            return render_template('password_reset.html',
                                   cambiado=False,
                                   no_existe=True)
