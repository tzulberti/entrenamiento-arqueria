# -*- coding: utf-8 -*-

'''
'''

from wtforms.fields import StringField, IntegerField
from wtforms.validators import InputRequired, Optional

from entrenamiento.views.form import ValidationForm


class ArcoForm(ValidationForm):
    ''' Tiene las cosas base para los arcos que son recurvados o compuestos.
    '''

    nombre = StringField('nombre', [InputRequired()])
    comentario = StringField('comentario')

    modelo_barra_larga_estabilizacion = StringField('modelo_barra_larga_estabilizacion')
    largo_barra_larga_estabilizacion = IntegerField('largo_barra_larga_estabilizacion', [Optional()])
    peso_adicional_barra_larga = IntegerField('peso_adicional_barra_larga', [Optional()])

    modelo_barra_lateral_estabilizacion = StringField('modelo_barra_lateral_estabilizacion')
    largo_barra_lateral_estabilizacion = IntegerField('largo_barra_lateral_estabilizacion', [Optional()])
    peso_adicional_barra_lateral = IntegerField('peso_adicional_barra_lateral', [Optional()])

    modelo_extender_estabilizacion = StringField('modelo_extender_estabilizacion')
    largo_extender_estabilizacion = IntegerField('largo_extender_estabilizacion', [Optional()])

    modelo_vbar_estabilizacion = StringField('modelo_vbar_estabilizacion')
    modelo_rest = StringField('modelo_rest')


class ArcoRecurvadoForm(ArcoForm):

    modelo_raiser = StringField('modelo_raiser')
    largo_raiser = IntegerField('largo_raiser', [Optional()])

    modelo_palas = StringField('modelo_palas')
    libraje_palas = IntegerField('libraje_palas', [Optional()])
    largo_palas = IntegerField('largo_palas', [Optional()])

    modelo_clicker = StringField('modelo_clicker')
    modelo_mira = StringField('modelo_mira')
    modelo_buttom = StringField('modelo_buttom')



    def validate(self):
        rv = super(ArcoRecurvadoForm, self).validate()
        if not rv:
            return False

        # me fijo que no exista otro lugar con el mismo nombre
        if not self.validate_unique('nombre'):
            return False

        self.instance = self.get_instance()
        return True


