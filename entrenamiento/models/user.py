# -*- coding: utf-8 -*-

from entrenamiento_arqueria.app.app import db

class User(db.Model):
    ''' Representa toda la informacion de un usuario que se
    puede loguear a la aplicacion.

    :param str username: el username que el mismo usa para loguearse

    :param str password: el password del usuario. El mismo esta
                         encryptado usando Bcrypt.

    :param str email: el email del usuario. El mismo es usado
                      para mandarle mails con respecto a cambios
                      en el sistema o si el usuario se olvido la
                      clave.

    :param str nombre: el nombre/s de la persona fisica que es
                        representado por este usuario,

    :param str apellido: el/los apellido/s de la persona fisica que es
                         representado por este usuario.
    '''

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    password = db.Column(db.String(1024), nullable=False)
    email = db.Column(db.String(250), nullable=False, unique=True)
    nombre = db.Column(db.String(1024), nullable=False)
    apellido = db.Column(db.String(1024), nullable=False)

