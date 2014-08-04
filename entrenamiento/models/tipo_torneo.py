
from entrenamiento.app.app import db
from entrenamiento.models.base import BaseModel

class TipoTorneo(BaseModel):
    ''' Tiene toda la informacion de los diferentes tipos de
    torneos.

    Aunque esto es una clase constante que no cambia, el modelo
    es diferente a las otras tablas constantes porque el mismo
    tiene mas informacion que es necesaria por la parte de javascript
    para poder resolver ciertas cosas.
    '''

    __tablename__ = 'tipo_torneo'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(256), nullable=False)
    tipo = db.Column(db.String(256), nullable=False)
    es_escuela = db.Column(db.Boolean, nullable=False)
    numero_de_rondas = db.Column(db.Integer, nullable=False)
    numero_de_series = db.Column(db.Integer, nullable=False)
    numero_de_flechas_por_serie = db.Column(db.Integer, nullable=False)
    distancia_ronda_1 = db.Column(db.Integer, nullable=False)
    series_de_practica_ronda_1 = db.Column(db.Integer, nullable=False)
    distancia_ronda_2 = db.Column(db.Integer, nullable=False)
    series_de_practica_ronda_2 = db.Column(db.Integer, nullable=False)
    # partir de la 3 ronda, si puede llegar a ser null porque dependiendo
    # del tipo de torneo tenemos que no puede haber una tercer ronda
    distancia_ronda_3 = db.Column(db.Integer)
    series_de_practica_ronda_3 = db.Column(db.Integer)
    distancia_ronda_4 = db.Column(db.Integer)
    series_de_practica_ronda_4 = db.Column(db.Integer)

    def __str__(self):
        return '%s -- %s' % (self.tipo, self.nombre)


