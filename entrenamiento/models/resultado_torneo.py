# -*- coding: utf-8 -*-

from entrenamiento.app.app import db
from entrenamiento.models.base import BaseModel

class ResultadoTorneo(BaseModel):
    ''' Tiene toda la informacion sobre el resultado de un torneo en cuestion.

    :param int id: un id autoincrementado

    :param int id_usuario: el id del usuario que tiro las flechas.

    :param date cuando: el momento en el que fue hecho el torneo o la practica del
                        mismo.
    :param bool fue_de_practica: si es True, entonces indica que en verdad no fue
                                 una torneo sino que fue una practica. Es decir,
                                 una clase en la que el alumno en cuestion tiro
                                 las mismas flechas que en un torneo.

    :param int tipo_de_torneo: indica los posibles tipos de torneo. Tiene que ser alguno
                               de los valores que figura en :class:`.TipoDeTorneo`

    :param int puntos_hechos: el puntaje final hecho a lo largo del torneo, entre
                              todas las series del mismo.

    :param int id_arco: el id del arco que fue usado para el torneo en cuestion.

    :param int id_flechas: el id de las flechas que fueron usadas para el torneo.

    :param int id_lugar: el id del lugar en donde se hizo el torneo.
    '''

    id = db.Column(db.Integer, primary_key=True)

    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    id_arco = db.Column(db.Integer, db.ForeignKey('arco.id'))
    id_flechas = db.Column(db.Integer, db.ForeignKey('flechas.id'))
    id_lugar = db.Column(db.Integer, db.ForeignKey('lugar.id'))

    cuando = db.Column(db.Date, nullable=False)
    fue_de_practica = db.Column(db.Boolean, nullable=False)
    tipo_de_torneo = db.Column(db.Integer, nullable=False)

    puntos_hechos = db.Column(db.Integer)


class ResultadoRonda(BaseModel):
    ''' Tiene la informacion sobre una de las rondas del torneo.

    El id del mismo indica el orden en el que se tiro en el torneo en cuestion.

    :param int id: un id autoincrementado.

    :param int id_usuario: el id del usuario que tiro las flechas en el torneo.
                           Tambien se pone el id en cuestion aca para evitar
                           que otro usuario pueda ver la informacion de las
                           rondas.

    :param int id_torneo: id_torneo: el id del torneo en cuestion al que
                                     pertence la informacion de la ronda.

    :param int distancia: la distancia (en metros) de cuanto se tiro en
                          la ronda. Esto es necesario para tener en cuenta
                          hay torneos outdoor en los que se tiran a distintas
                          distancias.

    :param int puntaje: el puntaje que se hizo en esta serie en cuestion.

    :param str foto_planilla_path: el path de donde se subio la foto de la
                                   planilla en cuestion. Es decir, la planilla
                                   en donde se tiene en cuenta todo el tema del
                                   puntaje de la misma.
    '''

    id = db.Column(db.Integer, primary_key=False)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    id_torneo = db.Column(db.Integer, db.ForeignKey('resultado_torneo.id'), nullable=False)

    distancia = db.Column(db.Integer, nullable=False)
    foto_planilla_path = db.Column(db.Text)

class ResultadoSerieRonda(BaseModel):
    ''' Tiene toda la informacion sobre el resultado de una serie.

    El id de la misma indica el orden de las series dentro de la ronda.
    '''

    id = db.Column(db.Integer, primary_key=False)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    id_torneo = db.Column(db.Integer, db.ForeignKey('resultado_ronda.id'), nullable=False)

    puntaje_felcha1 = db.Column(db.Integer, nullable=False)
    puntaje_felcha2 = db.Column(db.Integer, nullable=False)
    puntaje_felcha3 = db.Column(db.Integer, nullable=False)
    puntaje_felcha4 = db.Column(db.Integer, nullable=False)
    puntaje_felcha5 = db.Column(db.Integer, nullable=False)
    puntaje_felcha6 = db.Column(db.Integer, nullable=False)
    total_serie = db.Column(db.Integer, nullable=False)




