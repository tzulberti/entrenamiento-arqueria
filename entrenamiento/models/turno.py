# -*- coding: utf-8 -*-

from entrenamiento.app.app import db
from entrenamiento.models.base import BaseModel


class Turno(BaseModel):
    ''' Tiene toda la informacion de los diferentes lugares en donde
    se dan clases.

    Estos son los horarios oficiales. Es sabido que el arquero puede
    llegar a ir a entrenar cuando quiera, pero aca solo se guarda
    la informacion de cuando se dan clases

    '''

    id = db.Column(db.Integer, primary_key=True)
    id_lugar = db.Column(db.Integer, db.ForeignKey('lugar.id'))
    id_dia_semana = db.Column(db.Integer, db.ForeignKey('dia_semana.id'))
    horario_inicio = db.Column(db.Time, nullable=False)
    horario_fin = db.Column(db.Time, nullable=False)
