# -*- coding: utf-8 -*-

from sqlalchemy import UniqueConstraint

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

    def __str__(self):
        return self.value

class PermisoUsuario(BaseModel):
    ''' Tiene toda la informacion de como es que se relacionan los permisos
    con los usuarios del sistema correspondiente.


    :param int usuario: el identificador del usuario a quien se le va a
                        asignar el permiso correspondiente.

    :param int permiso: el identificador del permiso que se le esta
                        asignando al usuario.
    '''

    __table_args__ = (
        UniqueConstraint('id_usuario', 'id_permiso', name='usuario_permiso_unique'),
    )

    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer,
                           db.ForeignKey('usuario.id', ondelete='CASCADE'),
                           nullable=False)
    id_permiso = db.Column(db.Integer,
                           db.ForeignKey('permiso.id', ondelete='CASCADE'),
                           nullable=False)
