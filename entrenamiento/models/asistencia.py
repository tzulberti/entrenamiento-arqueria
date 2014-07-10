# -*- coding: utf-8 -*-

from entrenamiento.app.app import db
from entrenamiento.models.base import BaseModel

class Asistencia(BaseModel):
    ''' Se encarga de manejar el tema de que personas fueron a que turno.

    Esto es para manejar un registro de las personas que fueron por cada
    turno a la escuela.

    :param int id: un identificador unico autogenerado
    :param int id_turno: el turno al cual el arquero asistio
    :param int id_arquero: el arquero que fue a la clase.
    '''

    id = db.Column(db.Integer, primary_key=True)
    id_turno = db.Column(db.Integer, db.ForeignKey('turno.id'), nullable=False)
    id_arquero = db.Column(db.Integer, db.ForeignKey('arquero.id'), nullable=False)
    cuando = db.Column(db.Date, nullable=False)

    __table_args__ = (
            db.UniqueConstraint('id_turno', 'id_arquero', 'cuando', name='asistencia_turno_arquero_cuando'),
    )

