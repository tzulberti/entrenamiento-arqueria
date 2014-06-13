# -*- coding: utf-8 -*-

from entrenamiento.app.app import db
from entrenamiento.models.base import BaseModel

class Arquero(BaseModel):
    ''' Representa toda la informacion de todos los arqueros que hubo
    en la escuela.

    Se considera a una person un arquero si fue al menos a una clase.

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
    nombre = db.Column(db.String(1024), nullable=False)
    apellido = db.Column(db.String(1024), nullable=False)
    email = db.Column(db.String(250), nullable=True, unique=True)

    def __str__(self):
        return '%s %s' % (self.apellido, self.nombre)

