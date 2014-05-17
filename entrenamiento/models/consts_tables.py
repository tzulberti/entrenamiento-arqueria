# -*- coding: utf-8 -*-

''' Tiene todas las tablas que son categoricas/constantes.
'''

from entrenamiento.models.base import BaseConstModel

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

class TipoEncastreRiser(BaseConstModel):
    ''' Tiene los diferentes tipos de encastre que puede llegar a tener
    un riser
    '''

    __tablename__ = 'tipo_encastre_riser'

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
