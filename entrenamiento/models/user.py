# -*- coding: utf-8 -*-

from entrenamiento.app.app import db

class Usuario(db.Model):
    ''' Representa toda la informacion de un usuario que se
    puede loguear a la aplicacion.


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

    :param bool es_entrenador: si es True, entonces el usuario en cuestion
                               es un entrenador y puede ver la informacion
                               y graficos de todos los usuarios. Sin embargo,
                               no puede cargar ciertas cosas (como usuarios)

    :param bool es_administrador: si es True, entonces puede ver la informacion
                                  de los otros usuarios y ademas puede cargar
                                  ciertas cosas que el entrenador no puede.
    '''

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(250), nullable=False, unique=True)
    password = db.Column(db.String(1024), nullable=False)
    nombre = db.Column(db.String(1024), nullable=False)
    apellido = db.Column(db.String(1024), nullable=False)
    es_entrenador = db.Column(db.Boolean, nullable=False, default=False)
    es_administrador = db.Column(db.Boolean, nullable=False, default=False)


    def to_json(self):
        return dict(id=self.id,
                    email=self.email,
                    nombre=self.nombre,
                    apellido=self.apellido,
                    es_entrenador=self.es_entrenador,
                    es_administrador=self.es_administrador)

