# -*- coding: utf-8 -*-

from entrenamiento.app.app import db
from entrenamiento.models.base import BaseModel

class Usuario(BaseModel):
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

    :param str foto: el path en donde se encuentra la foto del arquero.

    :param float latitud: la latitud de donde vive el arquero en cuestion.

    :param float longitud: la longitud de donde vive el arquero.

    :param str dominancia_ojo: indica si el ojo con el que apunta el arquero
                               es distro o zurdo

    :param str dominancia_mano: indica con cual de las dos manos el arquero
                                agarra la cuerda del arco.
    '''

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(250), nullable=False, unique=True)
    password = db.Column(db.String(1024), nullable=False)
    nombre = db.Column(db.String(1024), nullable=False)
    apellido = db.Column(db.String(1024), nullable=False)
    es_entrenador = db.Column(db.Boolean, nullable=False, default=False)
    es_administrador = db.Column(db.Boolean, nullable=False, default=False)

    # estos datos son pedidos usados por la data de la EDA
    fecha_ingreso = db.Column(db.Date)
    fecha_nacimiento = db.Column(db.Date)
    telefono = db.Column(db.String(1024))
    celular = db.Column(db.String(1024))
    direccion = db.Column(db.String(1024))
    localidad = db.Column(db.String(1024))
    dni = db.Column(db.String(20))
    apodo_eda = db.Column(db.String(1024))
    dominancia_ojo = db.Column(db.String(20))
    dominancia_mano = db.Column(db.String(20))


    foto = db.Column(db.String(1024))
    latitud = db.Column(db.Float)
    longitud = db.Column(db.Float)


    def to_json(self):
        return dict(id=self.id,
                    email=self.email,
                    nombre=self.nombre,
                    apellido=self.apellido,
                    es_entrenador=self.es_entrenador,
                    es_administrador=self.es_administrador,
                    foto=self.foto,
                    latitud=self.latitud,
                    longitud=self.longitud)

    def __str__(self):
        return '%s %s' % (self.apellido, self.nombre)

