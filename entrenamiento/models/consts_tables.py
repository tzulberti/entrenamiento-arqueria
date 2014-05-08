# -*- coding: utf-8 -*-

''' Tiene todas las tablas que son categoricas/constantes.
'''

from entrenamiento.models.base import BaseConstModel

class LargoPalas(BaseConstModel):
    ''' Tiene la informacion sobre los diferentes largos de palas
    que pueden llegar a existir en el sistema.
    '''

    __tablename__ = 'largo_palas'
    pass

class RazonPago(BaseConstModel):
    ''' blah...
    '''

    __tablename__ = 'razon_pago'

class LargoRiser(BaseConstModel):
    ''' Tiene la informacion sobre los diferentes largos de riser
    (cuerpo del arco) que pueden llegar a existir.
    '''

    __tablename__ = 'largo_riser'

