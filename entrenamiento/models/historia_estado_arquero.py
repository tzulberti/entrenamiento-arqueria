# -*- coding: utf-8 -*-

from entrenamiento.app.app import db
from entrenamiento.models.base import BaseModel

class HistoriaEstadoArquero(BaseModel):
    ''' Representa toda la historia del estado de actividad del arquero.

    Como el arquero puede ir cambiando entre dos estados (Pasivo y Activo)
    entonces tenemos que ir guardando el historial.

    Un par de cosas a tener en cuenta sobre los valores:

    - si hasta es None, entonces tenemos que este es el ultimo estado
      de actividad del arquero porque significa hasta la fecha
      actual.

    - El hasta es el ultimo mes en el que estuvo en ese estado.
      Supongamos que en enero yo estuve pasivo, y en febrero ya pase a
      activo de nuevo. Entonces el hasta va a ser la fecha de enero (que
      va a ser la misma que la fecha de "desde")

    :param int id: un identificador unico autogenerado

    :param int id_arquero: el identificador del arquero para quien
                           se encuentra en este estado.

    :param int id_estado: el identificador del estado en el que se
                          encuentra el arquero

    :param date desde: la fecha desde la cual se encuentra en ese
                       estado. Como los estados son por mes, entonces
                       esto siempre va a ser el primer dia de cada mes.

    :param date hasta: la fecha hasta la cual se encuentraba en ese
                       estado.  Tambien es el primer dia de cada mes.
    '''

    id = db.Column(db.Integer, primary_key=True)
    id_arquero = db.Column(db.Integer, db.ForeignKey('arquero.id'), nullable=False)
    id_estado_arquero = db.Column(db.Integer, db.ForeignKey('estado_arquero.id'), nullable=False)
    desde = db.Column(db.Date, nullable=False)
    hasta = db.Column(db.Date)

    __table_args__ = (
            db.UniqueConstraint('id_arquero', 'desde', name='historia_estado_arquero_arquero_desde'),
    )

