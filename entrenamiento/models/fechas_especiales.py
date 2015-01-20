# -*- coding: utf-8 -*-

from entrenamiento.app.app import db
from entrenamiento.models.base import BaseModel

class FechaEspecial(BaseModel):
    ''' Tiene toda la informacion de un tipo de fecha que es especial.

    Por ejemplo:

    - tiene la informacion de cuando es feriado
    - cuando son los diferentes tipos de torneos
    - cuando son las clinicas
    '''

    id = db.Column(db.Integer, primary_key=True)
    cuando = db.Column(db.Date, nullable=False)
    id_tipo_dia_especial = db.Column(db.Integer,
                                     db.ForeignKey('tipo_dia_especial.id', ondelete='CASCADE'),
                                     nullable=False)
