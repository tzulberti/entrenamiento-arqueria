# -*- coding: utf-8 -*-

from entrenamiento.app.app import db
from entrenamiento.models.base import BaseModel

class Torneo(BaseModel):
    ''' Tiene toda la informacion sobre el tipo de resultado.
    Es importante tener en cuenta que esto se lo usa tanto para
    los torneos reales como para las practicas de torneos.

    :param int id: un numero autoincrementado.

    :param date cuando: la fecha de cuando fue el torneo en cuestion.

    :param int id_usuario: el id del usuario que va a cargar la informacion
                           sobre como le fue en el torneo.

    :param int id_lugar: el identificador del lugar en donde fue el
                         torneo.

    :param str tipo_de_torneo: identifica que tipo de torneo se esta haciendo.

    :param int puntaje_final_torneo: es la suma del puntaje de las 4 o 2
                                     series del torneo.

    :param boolean fue_practica: si es True, entonces esto no fue un torneo
                                 en si, sino que fue una practica.

    :param str comentario: el comentario que quiere poner el usuario en cuestion.

    :param int posicion_classificacion: la posicion que termino el tirador
                                        teniendo en cuenta las X rondas del torneo.
                                        Esto no es para la posicion dentro si se gano
                                        medalla

    :param int posicion_eliminatorias: la posicion que se tiene en las eliminatorias.
                                       Basicamente esto es para ver si se termino 1,
                                       2 o 3°
    '''

    id = db.Column(db.Integer, primary_key=True)
    cuando = db.Column(db.Date, nullable=False)

    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id', ondelete='CASCADE'), nullable=False)
    id_tipo_de_torneo = db.Column(db.Integer, db.ForeignKey('tipo_torneo.id'), nullable=False)
    id_lugar = db.Column(db.Integer, db.ForeignKey('lugar.id', ondelete='SET NULL'))
    id_arco = db.Column(db.Integer, db.ForeignKey('arco.id', ondelete='SET NULL'))

    comentario = db.Column(db.Text)
    puntaje_final_torneo = db.Column(db.Integer)
    fue_practica = db.Column(db.Boolean, nullable=False)
    posicion_classificacion = db.Column(db.Integer)
    posicion_eliminatoria = db.Column(db.Integer)


class Ronda(BaseModel):
    ''' Tiene toda la informacion de una ronda del torneo.

    :param int id: un valor unico autoincrementado

    :param int id_torneo: el identificador del torneo a donde pertence
                          la ronda en cuestion.

    :param int puntaje: el puntaje que se hizo en esta ronda.

    :param int distancia: la distancia a la que se tiro en este
                          torneo.

    :param str foto: en caso de que no se quiera cargar toda la
                     inforamcion de las series, tiene la foto de
                     la planilla de resultado que se le entrego
                     a los jueces
    '''

    id = db.Column(db.Integer, primary_key=True)
    id_torneo = db.Column(db.Integer, db.ForeignKey('torneo.id', ondelete='CASCADE'), nullable=False)
    puntaje = db.Column(db.Integer)
    distancia = db.Column(db.Integer)
    foto_path = db.Column(db.Text)


class Serie(BaseModel):
    ''' Tiene toda la informacion para una de las series del
    torneo.

    :param int id: un valor unico autoincrementado.

    :param boolean fue_de_practica: si es True, entonces esta serie
                                    fue una de las series de pracitca
                                    antes de empezar las series que se
                                    puntean

    :param int puntaje_flecha_X: el puntaje de la flecha X. El mismo tiene
                                 que ir desde el puntaje mas alto al puntaje
                                 mas bajo. Es decir, puntaje_flecha_1 tiene
                                 que ser el mas alto, y puntaje_flecha_6 el
                                 mas bajo. En caso de que una flecha haya sido
                                 mala, entonces se la pone como 0.


    :param int puntaje_final: el puntaje de las 6 flechas.
    '''

    id = db.Column(db.Integer, primary_key=True)
    id_ronda = db.Column(db.Integer, db.ForeignKey('ronda.id', ondelete='CASCADE'), nullable=False)
    fue_de_practica = db.Column(db.Boolean)
    puntaje_flecha_1 = db.Column(db.Integer)
    puntaje_flecha_2 = db.Column(db.Integer)
    puntaje_flecha_3 = db.Column(db.Integer)
    puntaje_flecha_4 = db.Column(db.Integer)
    puntaje_flecha_5 = db.Column(db.Integer)
    puntaje_flecha_6 = db.Column(db.Integer)
    puntaje_total = db.Column(db.Integer)


