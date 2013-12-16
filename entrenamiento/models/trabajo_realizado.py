# -*- coding: utf-8 -*-

from entrenamiento.app.app import db
from entrenamiento.models.base import BaseModel
from entrenamiento.models.arco import Arco
from entrenamiento.models.gimnasio import RutinaGimnasio
from entrenamiento.models.lugar import Lugar




class TrabajoRealizado(BaseModel):
    ''' Tiene toda la informacion sobre el trabajo que hizo uno de los
    arqueros
    '''

    id = db.Column(db.Integer, primary_key=True)
    cuando = db.Column(db.Date, nullable=False)
    hora_acostarse = db.Column(db.Time)
    hora_levantarse = db.Column(db.Time)

    # puede cargar toda la informacion de una o directamente
    # cargar la informacion de la misma.
    cantidad_de_flechas = db.Coumn(db.Integer)
    distancia = db.Column(db.Integer)
    arco_usado = db.relationship(Arco)
    lugar = db.relationship(Lugar)

    rutina_gimnasio = db.relationship(RutinaGimnasio)
    uso_proteinas = db.Column(db.Boolean)
    uso_aminoacidos = db.Column(db.Boolean)

class InformacionDetalladaFelchas(BaseModel):
    ''' Tiene toda la informacion detallada sobre las felchas que se tiraron
    en un dia especifico.
    '''

    id = db.Column(db.Integer, primary_key=True)
    hora_inicio = db.Column(db.Time, nullable=False)
    cantidad_de_flechas = db.Coumn(db.Integer)
    distancia = db.Column(db.Integer)
    arco_usado = db.relationship(Arco,
                                 lazy='select')
    lugar = db.relationship(Lugar,
                            lazy='select')
    trabajo_realizado = db.relationship('TrabajoRealizado',
                                        backref='informacion_detallada')


