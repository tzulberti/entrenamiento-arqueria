# -*- coding: utf-8 -*-

''' Tiene las diferentes constantes que son usados en los modelos.
'''

class TipoDeTorneo(object):
    ''' Indica todos los tipos de torneo posibles.
    '''

    #: indica que el torneo fue indoor a 18m.
    INDOOR_18M = 0

    #: indica que el torneo fue indoor a 25m. No se si
    #: existen de estos en la argentina pero por si las
    #: moscas lo pongo.
    INDOOR_25M = 1

    #: indica que el torneo es un outdoor de dos series
    #: a 20m de distancia (cada serie de 26 flechas)
    OUTDOOR_20_20 = 2

    #: indica que el torneo es un outdoor de dos series
    #: a 20m de distancia (cada serie de 26 flechas)
    OUTDOOR_30_30 = 3
    #: indica que el torneo es un outdoor de dos series
    #: a 20m de distancia (cada serie de 26 flechas)
    OUTDOOR_50_50 = 4
    #: indica que el torneo es un outdoor de dos series
    #: a 20m de distancia (cada serie de 26 flechas)
    OUTDOOR_60_60 = 5

    #: indica que el torneo es un outdoor de dos series
    #: a 20m de distancia (cada serie de 26 flechas)
    OUTDOOR_70_70 = 6

    #: indica que el torneo es un FITA 1440. El mismo es
    #: un torneo de 4 distancias, y en cada distancia hay
    #: 6 series de 6 flechas. Las distancias depende de si
    #: el arquero es hombre o mujer. Si es un hombre, entonces
    #: las distancias son 30, 50, 70 y 90m. Si es una mujer
    #: entonces las distancias son 30, 50, 60, y 70m.
    OUTDOOR_FITA_1440 = 7


class DistanciasPemitidas(object):
    ''' Tiene todas las posibles distancias a las que un tirador puede haber
    tirado.
    '''

    #: las posibles distancias cuando el torneo es indoor.
    INDOOR = (18, 25)

    #: las posibles distancias cuando el torneo es outdoor.
    OUTDOOR = (20, 30, 50, 60, 70, 90)


