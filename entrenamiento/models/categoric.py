# -*- coding: utf-8 -*-

''' Tiene todas las tablas que son categoricas/constantes.
'''

from entrenamiento.app.app import db
from entrenamiento.models.base import BaseModel

class LargoPalas(BaseModel):
    ''' Tiene la informacion sobre los diferentes largos de palas
    que pueden llegar a existir en el sistema.
    '''

    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.Text, unique=True)
    show_order = db.Column(db.Integer, unique=True)

class LargoRiser(BaseModel):
    ''' Tiene la informacion sobre los diferentes largos de riser
    (cuerpo del arco) que pueden llegar a existir.
    '''

    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.Text, unique=True)
    show_order = db.Column(db.Integer, unique=True)

