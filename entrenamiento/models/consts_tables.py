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


class DiaDeSemana(BaseConstModel):
    ''' Tiene los diferentes dia de la semana
    '''

    __tablename__ = 'dia_semana'

class EstadoArquero(BaseConstModel):
    ''' Tiene la informacion sobre los diferentes estados de
    actividad del arquero
    '''

    __tablename__ = 'estado_arquero'


class TipoEntrenamiento(BaseConstModel):
    ''' Tiene todo los tipos de actividades que puede haber hecho
    el arquero tirando (ATR)
    '''

    __tablename__ = 'tipo_entrenamiento'

class RazonGasto(BaseConstModel):
    ''' Tiene llas diferentes opciones de porque se hizo el gasto
    '''

    __tablename__ = 'razon_gasto'

class MarcaFlechas(BaseConstModel):
    ''' Tiene toda la informacion de los fabricantes de flechas
    '''

    __tablename__ = 'marca_flechas'

class ModeloFlechas(BaseConstModel):
    ''' Tiene toda la informacion sobre los diferentes modelos de
    flechas que existen.
    '''

    __tablename__ = 'modelo_flechas'

class TipoUsoFlechas(BaseConstModel):
    ''' Tiene toda la informacion sobre los diferentes tipos de uso
    que se le pueden dar a las flechas.
    '''

    __tablename__ = 'tipo_uso_flechas'
