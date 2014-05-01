# -*- coding: utf-8 -*-

from entrenamiento.app.app import db
from entrenamiento.models.base import BaseModel

class Permiso(BaseModel):
    ''' Tiene los diferentes permisos que pueden llegar a ser
    asignados a los usuarios para que los mismos ejecuten diferentes
    opciones en el sistema.

    :param int id: un identificador del permiso autogenerador

    :param str value: un texto que indica que cosas puede hacer el
                      usuario que tiene asignado este permiso.
    '''

    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.Text, unique=True)


