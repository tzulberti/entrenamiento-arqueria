# -*- coding: utf-8 -*-

from entrenamiento.app.app import db
from entrenamiento.models.base import BaseModel
from entrenamiento.models.lugar import Lugar
from entrenamiento.models.usuario import Usuario

class Torneo(BaseModel):
    ''' Tiene toda la informacion sobre el tipo de resultado.
    '''

    id = db.Column(db.Integer, primary_key=True)
    cuando = db.Column(db.Date, nullable=False)
    usuario = db.relationship(Usuario, nullable=False)
    donde = db.relationship(Lugar)

    tipo_de_torneo = db.Column(db.Text)
    puntaje_final_torneo = db.Column(db.Integer)
    fue_practica = db.Column(db.Boolean)


class InformacionRonda(BaseModel):
    ''' Tiene toda la informacion de una ronda del torneo.
    '''

    id = db.Column(db.Integer, primary_key=True)
    torneo = db.relationship(Torneo,
                             backref='rondas')
    puntaje = db.Column(db.Integer)
    distancia = db.Column(db.Integer)


class Serie(BaseModel):
    ''' Tiene toda la informacion para una de las series del
    torneo.
    '''

    id = db.Column(db.Integer, primary_key=True)
    fue_de_practica = db.Column(db.Boolean)
    puntaje_flecha_1 = db.Column(db.Integer)
    puntaje_flecha_2 = db.Column(db.Integer)
    puntaje_flecha_3 = db.Column(db.Integer)
    puntaje_flecha_4 = db.Column(db.Integer)
    puntaje_flecha_5 = db.Column(db.Integer)
    puntaje_flecha_6 = db.Column(db.Integer)
    puntaje_total = db.Column(db.Integer)

