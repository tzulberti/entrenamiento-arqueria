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
    codigo = db.Column(db.String(10), nullable=False, unique=True)

    # estos datos son pedidos usados por la data de la EDA
    fecha_ingreso = db.Column(db.Date)
    fecha_abandono = db.Column(db.Date)
    fecha_nacimiento = db.Column(db.Date)
    telefono = db.Column(db.String(1024))
    celular = db.Column(db.String(1024))
    direccion = db.Column(db.String(1024))
    localidad = db.Column(db.String(1024))
    dni = db.Column(db.String(20))
    apodo_eda = db.Column(db.String(1024))
    id_dominancia_ojo = db.Column(db.Integer, db.ForeignKey('dominancia_ojo.id'), nullable=True)
    id_dominancia_mano = db.Column(db.Integer, db.ForeignKey('dominancia_mano.id'), nullable=True)
    codigo_postal = db.Column(db.String(20))


    foto = db.Column(db.String(1024))
    latitud = db.Column(db.Float)
    longitud = db.Column(db.Float)


    usuario = db.relationship('Usuario', backref='arquero')

    def __str__(self):
        return '%s %s' % (self.apellido, self.nombre)

    def to_fk_information(self):
        return dict(imagePath='user_images/' + self.foto if self.foto else None,
                    id=self.id,
                    value=unicode(self))

