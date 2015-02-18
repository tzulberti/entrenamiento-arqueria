# -*- coding: utf-8 -*-

from entrenamiento.app.app import db
from entrenamiento.models.base import BaseModel

class Usuario(BaseModel):
    ''' Representa toda la informacion de un usuario que se
    puede loguear a la aplicacion.



    :param str password: el password del usuario. El mismo esta
                         encryptado usando Bcrypt.

    :param str nombre: el nombre/s de la persona fisica que es
                        representado por este usuario,

    :param str apellido: el/los apellido/s de la persona fisica que es
                         representado por este usuario.

    :param bool es_administrador: si es True, entonces puede ver la informacion
                                  de los otros usuarios y ademas puede cargar
                                  ciertas cosas que el entrenador no puede.

    :param str foto: el path en donde se encuentra la foto del arquero.

    :param float latitud: la latitud de donde vive el arquero en cuestion.

    :param float longitud: la longitud de donde vive el arquero.

    :param str dominancia_ojo: indica si el ojo con el que apunta el arquero
                               es distro o zurdo

    :param str dominancia_mano: indica si el arquero generalmente es diestro
                                o zurdo o ambi-diestro para hacer las cosas
                                de la vida (escribir, comer, etc...)
    '''

    id = db.Column(db.Integer, primary_key=True)
    id_arquero = db.Column(db.Integer, db.ForeignKey('arquero.id'), nullable=False)
    password = db.Column(db.String(1024), nullable=False)
    es_administrador = db.Column(db.Boolean, nullable=False, default=False)


    def to_json(self):
        res = super(Usuario, self).to_json()
        res['arquero'] = self.arquero.to_json()
        del res['password']
        del res['es_administrador']
        return res

    def __str__(self):
        return u'%s %s' % (self.arquero.apellido, self.arquero.nombre)

    def to_fk_information(self):
        return dict(image_path=self.arquero.foto,
                    id=self.id,
                    value=unicode(self))


