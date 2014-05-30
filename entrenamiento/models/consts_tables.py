# -*- coding: utf-8 -*-

''' Tiene todas las tablas que son categoricas/constantes.
'''

from entrenamiento.app.app import db
from entrenamiento.models.base import BaseConstModel, BaseModel


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




class RazonPago(BaseConstModel):
    ''' Las difererentes tipo de pagos que puede haber hecho el
    usuario
    '''

    __tablename__ = 'razon_pago'


class LargoPalas(BaseConstModel):
    ''' Tiene la informacion sobre los diferentes largos de palas
    que pueden llegar a existir en el sistema.
    '''

    __tablename__ = 'largo_palas'

class LargoRiser(BaseConstModel):
    ''' Tiene la informacion sobre los diferentes largos de riser
    (cuerpo del arco) que pueden llegar a existir.
    '''

    __tablename__ = 'largo_riser'

class TipoEncastre(BaseConstModel):
    ''' Tiene los diferentes tipos de encastre que puede llegar a tener
    un riser
    '''

    __tablename__ = 'tipo_encastre'

class MarcaRiser(BaseConstModel):
    ''' Tiene las diferentes marcas que hacen risers
    '''

    __tablename__ = 'marca_riser'


class MarcaPalas(BaseConstModel):
    ''' Tiene las diferentes marcas que hacen palas
    '''

    __tablename__ = 'marca_palas'


class MarcaMira(BaseConstModel):
    ''' Tiene las diferentes marcas que hacen miras
    '''

    __tablename__ = 'marca_mira'


class MarcaEstabilizacion(BaseConstModel):
    ''' Tiene la informacion de las empresas que hacen estabilizaciones.
    '''

    __tablename__ = 'marca_estabilizacion'


class TipoHiloCuerda(BaseConstModel):
    ''' Los diferentes marteriales que se pueden llegar a usar para hacer
    la cuerda.
    '''

    __tablename__ = 'tipo_hilo_cuerda'

class DominanciaOjo(BaseConstModel):

    __tablename__ = 'dominancia_ojo'

class DominanciaMano(BaseConstModel):

    __tablename__ = 'dominancia_mano'
