# -*- coding: utf-8 -*-

from entrenamiento.app.app import db
from entrenamiento.models.base import BaseModel

class Invitacion(BaseModel):
    ''' Como los arqueros normalmente solo se pueden registrar mediante una
    invitacion, esto registra a todas las personas a quienes se les envio
    una invitacion.

    :param int id: un identificador autogenerado.

    :param int id_arquero: el identificador del arquero a quien se le
                           envio el email para que se cree una cuenta.

    :param str codigo: un codigo de la invitacion. Esto es un campo interno
                       para asegurarse de quienes se le hayan enviado una
                       invitacion puedan crear su usuario.

    :param boolean usada: si es True, entonces la misma ya fue usada y no
                          se la puede usar para crear a otro usuario.
    '''

    id = db.Column(db.Integer, primary_key=True)
    id_arquero = db.Column(db.Integer, db.ForeignKey('arquero.id'), nullable=False)
    codigo = db.Column(db.String(10), nullable=False, unique=True)
    usada = db.Column(db.Boolean, nullable=False, default=False)

