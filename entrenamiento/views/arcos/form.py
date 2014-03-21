# -*- coding: utf-8 -*-


from wtforms.fields import StringField, IntegerField, SelectField, TextAreaField
from wtforms.validators import InputRequired, Optional

from entrenamiento.views.form import ValidationForm, ValidateUnique, ValidateUniques
from entrenamiento.views.arcos.consts import (LARGO_PALAS_RISER,
                                              MARCA_PALAS_RISER)

class ArcoForm(ValidationForm):
    ''' Tiene las cosas base para los arcos que son recurvados o compuestos.
    '''

    nombre = StringField('nombre', [InputRequired(), ValidateUnique()])
    comentario = TextAreaField('comentario')

    modelo_barra_larga_estabilizacion = StringField('modelo_barra_larga_estabilizacion')
    largo_barra_larga_estabilizacion = IntegerField('largo_barra_larga_estabilizacion',
                                                    [Optional()],
                                                    description='Largo de la barra principal en pulgadas')
    peso_adicional_barra_larga = IntegerField('peso_adicional_barra_larga',
                                              [Optional()],
                                              description='Los pesos addicionales en grames')

    modelo_barra_lateral_estabilizacion = StringField('modelo_barra_lateral_estabilizacion')
    largo_barra_lateral_estabilizacion = IntegerField('largo_barra_lateral_estabilizacion',
                                                      [Optional()],
                                                      description='El largo de las mismas en pulgadas')
    peso_adicional_barra_lateral = IntegerField('peso_adicional_barra_lateral',
                                                [Optional()],
                                                description='Los pesos de una de las barras laterales (en grames)')

    modelo_extender_estabilizacion = StringField('modelo_extender_estabilizacion')
    largo_extender_estabilizacion = IntegerField('largo_extender_estabilizacion',
                                                 [Optional()],
                                                 description='El largo del mismo en pulgadas')

    modelo_vbar_estabilizacion = StringField('modelo_vbar_estabilizacion')
    modelo_rest = StringField('modelo_rest')


class ArcoRecurvadoForm(ArcoForm):

    marca_riser = SelectField('marca_riser',
                               choices=MARCA_PALAS_RISER,
                               validators=[Optional()])
    modelo_riser = StringField('modelo_riser')
    largo_riser = SelectField('largo_riser',
                               choices=LARGO_PALAS_RISER,
                               validators=[Optional()])

    marca_palas = SelectField('marca_palas',
                              choices=MARCA_PALAS_RISER,
                              validators=[Optional()])
    modelo_palas = StringField('modelo_palas')
    largo_palas = SelectField('largo_palas',
                              validators=[Optional()],
                              choices=LARGO_PALAS_RISER)
    libraje_palas = IntegerField('libraje_palas',
                                 [Optional()],
                                 description='El libraje de las mismas segun la '\
                                             'fabrica. No uno termina sacando')

    modelo_clicker = StringField('modelo_clicker')
    modelo_mira = StringField('modelo_mira')
    modelo_cushion_plunger = StringField('modelo_cushion_plunger')


