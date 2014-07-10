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
    id_lugar = db.Column(db.Integer, db.ForeignKey('lugar.id'), nullable=False)
    id_dia_semana = db.Column(db.Integer, db.ForeignKey('dia_semana.id'), nullable=False)
    horario_inicio = db.Column(db.Time, nullable=False)
    horario_fin = db.Column(db.Time, nullable=False)

    def __str__(self):
        return '%s: %s - %s' % (self.lugar, self.horario_inicio, self.horario_fin)
