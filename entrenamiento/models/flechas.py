# -*- coding: utf-8 -*-

from entrenamiento.app.app import db
from entrenamiento.models.base import BaseModel

class Flechas(BaseModel):
    ''' Tiene toda la informacion de las flechas que puede llegar a usar
    el arquero en cuestion.

    :param int id: un identificador autogenerado.

    :param int id_usuario: el identificador del usuario a quien le pertence toda
                           la informacion de las flechas.

    :param str comentario: un comentario sobre las flechas que uno esta usando
                           Por ejemplo: "las corte 2mm de atras, etc.."

    :param int id_tipo_uso: identifica si las flechas se las usa solo para indoor,
                            o solo para outdoor o para ambas.

    :param int id_marca_flechas: el identificador de la marca de las flechas (easton,
                                 cartel, etc..)

    :param int id_modelo_flechas: el identificador del modelo de flechas (carbon one,
                                  jazz, etc...)

    :param int calibre_flechas: indica el calibre de la flecha. Para las jazz, y
                                las platinum el mismo va a ser algo como 1916, pero
                                para las flechas de carbono va a ser algo como 600

    :param int punta: informacion de la punta. Para flechas de outdoor indica el peso
                      en grames de las mismas.

    :param float largo: el largo de las flechas que usa.

    :param str info_nock: toda la informacion del nock (marca, modelo, tamaño)

    :param str info_timones: toda la informacion sobre los timones que se estan usando
                             (color, largo, marca y modelo, etc..)
    '''

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    id_usuario = db.Column(db.Integer,
                           db.ForeignKey('usuario.id', ondelete='CASCADE'),
                           nullable=False)
    comentario = db.Column(db.Text)

    id_tipo_uso = db.Column(db.Integer,
                            db.ForeignKey('tipo_uso_flechas.id'),
                            nullable=False)

    id_marca_flechas = db.Column(db.Integer,
                                 db.ForeignKey('marca_flechas.id'),
                                 nullable=False)

    id_modelo_flechas = db.Column(db.Integer,
                                  db.ForeignKey('modelo_flechas.id'),
                                  nullable=False)

    calibre_flechas = db.Column(db.Integer)
    punta = db.Column(db.Integer)
    largo = db.Column(db.Float)
    info_nock = db.Column(db.String(1024))
    info_timones = db.Column(db.String(1024))

