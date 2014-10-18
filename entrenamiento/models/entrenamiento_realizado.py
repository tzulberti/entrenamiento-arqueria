# -*- coding: utf-8 -*-

from entrenamiento.app.app import db
from entrenamiento.models.base import BaseModel


class EntrenamientoRealizado(BaseModel):
    ''' Tiene toda la informacion sobre el entrenamiento que hizo uno de los
    arqueros
    '''

    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer,
                           db.ForeignKey('usuario.id', ondelete='CASCADE'),
                           nullable=False)
    cuando = db.Column(db.Date, nullable=False)


class EntrenamientoFlechas(BaseModel):
    ''' Tiene toda la informacion detallada sobre las felchas que se tiraron
    en un dia especifico.
    '''

    id = db.Column(db.Integer, primary_key=True)
    id_entrenamiento_realizado = db.Column(db.Integer,
                                           db.ForeignKey('entrenamiento_realizado.id', ondelete='CASCADE'),
                                           nullable=False)
    hora_inicio = db.Column(db.Time)
    cantidad_de_flechas = db.Column(db.Integer)
    distancia = db.Column(db.Integer)
    id_arco = db.Column(db.Integer,
                        db.ForeignKey('arco.id'))
    id_lugar = db.Column(db.Integer,
                         db.ForeignKey('lugar.id'))

