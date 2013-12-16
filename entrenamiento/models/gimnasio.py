# -*- coding: utf-8 -*-

from entrenamiento.app.app import db
from entrenamiento.models.base import BaseModel

class RutinaGimnasio(BaseModel):
    ''' Tiene toda la informacion sobre una de las rutinas del gimnasio que
    el arquero esta haciendo.
    '''

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.Text)

