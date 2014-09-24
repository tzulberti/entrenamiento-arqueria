# -*- coding: utf-8 -*-

from entrenamiento.app.app import db
from entrenamiento.models.base import BaseModel

class Arco(BaseModel):
    ''' Representa toda la informacion del arco que un usuario puede usar.

    :param str nombre: un nombre que le dio el usuario al arco para
                       poder identificar el mismo.

    :param str tipo_de_arco: indica si el arco es compuesto o recurvado.

    :param str comentario: algun comentario que quiera agregar el usuario
                           sobre el arco.

    :param str modelo_barra_larga_estabilizacion: es el nombre del modelo
                                                  de la barra principal de
                                                  estabilizacion.

    :param int largo_barra_larga_estabilizacion: es el largo en pulgadas
                                                 de la barra.

    :param int peso_adicional_barra_larga: el peso, en grames, que se le
                                           agrego a la barra.

    .. todo:: falta agregar los campos para ver si la barra tiene
              dumpers o no.
    '''
    __mapper_args__ = {'polymorphic_on': 'tipo_arco'}

    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id'))
    nombre = db.Column(db.String(1024), nullable=False)
    comentario = db.Column(db.Text)
    foto_path = db.Column(db.Text, nullable=True)
    tipo_arco = db.Column(db.String(255), nullable=False)

    draw = db.Column(db.Float)

    id_marca_barra_larga_estabilizacion = db.Column(db.Integer, db.ForeignKey('marca_estabilizacion.id'))
    modelo_barra_larga_estabilizacion = db.Column(db.String(1024))
    largo_barra_larga_estabilizacion = db.Column(db.Integer)
    peso_adicional_barra_larga = db.Column(db.Integer)

    id_marca_barra_lateral_estabilizacion = db.Column(db.Integer, db.ForeignKey('marca_estabilizacion.id'))
    modelo_barra_lateral_estabilizacion = db.Column(db.String(1024))
    largo_barra_lateral_estabilizacion = db.Column(db.Integer)
    peso_adicional_barra_lateral = db.Column(db.Integer)

    id_marca_extender_estabilizacion = db.Column(db.Integer, db.ForeignKey('marca_estabilizacion.id'))
    modelo_extender_estabilizacion = db.Column(db.String(1024))
    largo_extender_estabilizacion = db.Column(db.Integer)

    modelo_vbar_estabilizacion = db.Column(db.String(1024))
    vbar_angulo_apertura = db.Column(db.Integer)
    vbar_angulo_inclinacion = db.Column(db.Integer)
    modelo_rest = db.Column(db.String(1024))

    def __str__(self):
        return '%s' % self.nombre


class ArcoRecurvado(Arco):
    ''' En este caso se guarda toda la informacion sobre el arco recurvado
    que el usuario esta usando.

    '''
    __mapper_args__ = {'polymorphic_identity': 'recurvado'}

    id = db.Column(db.Integer, db.ForeignKey('arco.id'), primary_key=True)

    id_marca_riser = db.Column(db.Integer, db.ForeignKey('marca_riser.id'))
    modelo_riser = db.Column(db.String(1024))
    id_largo_riser = db.Column(db.Integer, db.ForeignKey('largo_riser.id'))
    id_tipo_encastre = db.Column(db.Integer, db.ForeignKey('tipo_encastre.id'))
    usa_barras_cortas = db.Column(db.Boolean, nullable=False, default=False)


    id_marca_palas = db.Column(db.Integer, db.ForeignKey('marca_palas.id'))
    modelo_palas = db.Column(db.String(1024))
    libraje_palas = db.Column(db.Integer)
    libraje_real = db.Column(db.Integer)
    id_largo_palas = db.Column(db.Integer, db.ForeignKey('largo_palas.id'))
    usa_honguitos = db.Column(db.Boolean, nullable=False, default=False)

    tiller = db.Column(db.Float)
    brace = db.Column(db.Float)
    altura_nocking_point = db.Column(db.Float)

    modelo_clicker = db.Column(db.String(1024))
    id_marca_mira = db.Column(db.Integer, db.ForeignKey('marca_mira.id'))
    modelo_mira = db.Column(db.String(1024))
    usa_peewees = db.Column(db.Boolean, nullable=False, default=False)

    modelo_cushion_plunger = db.Column(db.String(1024))

    id_tipo_hilo_cuerda = db.Column(db.Integer, db.ForeignKey('tipo_hilo_cuerda.id'))
    cantidad_hilos_cuerda = db.Column(db.Integer)
    largo_cuerda = db.Column(db.Integer)
    cantidad_vueltas_cuerda = db.Column(db.Integer)

