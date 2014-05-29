# -*- coding: utf-8 -*-

from entrenamiento.app.app import db
from entrenamiento.models.base import BaseModel

class Lugar(BaseModel):
    ''' Representa uno de los lugares en donde el arquero
    entrena.

    Tambien se lo puede llegar a usar para marcar los lugares
    en donde algun usuario fue a algun torneo.

    :param str nombre: un nombre que identifica el lugar de los
                       otros lugares. Por ejemplo: Club Maldonado.

    :param float latitud: la latitud de donde queda el lugar.

    :param float longitud: la longitud de donde queda el lugar

    :param boolean es_de_entrenamiento: si es True, entonces este es un
                                        lugar donde los arqueros pueden
                                        entrenar. Sino es un lugar a donde
                                        los arqueros fueron a tirar por
                                        una vez un torneo.

    :param boolean es_outdoor: si es True, entonces es un lugar outdoor,
                               sino es indoor.
    '''

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(1024), unique=True, nullable=False)
    latitud = db.Column(db.Float, nullable=False)
    longitud = db.Column(db.Float, nullable=False)
    es_de_entrenamiento = db.Column(db.Boolean, nullable=False, default=True)
    es_outdor = db.Column(db.Boolean, nullable=False)
