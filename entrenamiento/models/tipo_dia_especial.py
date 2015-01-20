# -*- coding: utf-8 -*-

from entrenamiento.app.app import db
from entrenamiento.models.base import BaseModel

class TipoDiaEspecial(BaseModel):
    ''' Tiene toda la informacion para un los tipos de dias especiales de
    entrenamiento.

    Por ejemplo:

    - los dias que hay un torneo outdoor
    - los dias que hay un torneo indoor
    - los feriados nacionales
    - las clinicas de entrenamiento

    '''

    __tablename__ = 'tipo_dia_especial'

    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.Text, nullable=False)
    color = db.Column(db.Text, nullable=False)

    def __str__(self):
        return self.value

