# -*- coding: utf-8 -*-

from entrenamiento.app.app import db
from entrenamiento.models.base import BaseModel

class Pago(BaseModel):
    ''' Tiene toda la informacion correspondiente a un pago.
    '''

    id = db.Column(db.Integer, primary_key=True)
    cuando = db.Column(db.Date, nullable=False)
    mes_correspondiente = db.Column(db.Date, nullable=False)
    importe = db.Column(db.Float, nullable=False)
    razon = db.Column(db.String, nullable=False)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    cargado_por = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)


