# -*- coding: utf-8 -*-

from entrenamiento_arqueria.app.app import db

class Clima(db.Model):
    ''' Tiene la informacion del clima en algun lugar.


    :param datetime fecha: para que dia y que hora del mismo se obtuvo la
                           informacion del clima.

    :param :class:`.Lugar` lugar: para que lugar corresponde la informacion

    :param float temperatura: la temperatura del clima.

    :param float temperatura_ambiente: la temperatura ambiente.

    :param str tipo: indica si fue un dia con lluvia, nublado, soleado, etc...

    :param str viento: tiene toda la informacion del viento.

    :param str lluvia: tiene toda la inforamcion de la lluvia.
    '''

    id = db.Column(db.Integer, primary_key=True)
    fecha = db.Column(db.DateTime, nullable=False)
    lugar = db.
