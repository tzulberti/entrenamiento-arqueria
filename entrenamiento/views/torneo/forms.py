# -*- coding: utf-8 -*-

from wtforms.fields import (StringField, IntegerField, BooleanField,
                            DateField)
from wtforms.validators import InputRequired, Optional, NumberRange

from entrenamiento.views.form import ValidationForm, ModelForm



class SerieForm(ValidationForm):
    ''' Valido los datos ingresados por el tema de las series.
    '''

    id_ronda = IntegerField('id_ronda', [InputRequired()])
    fue_de_practica = BooleanField('fue_de_practica')
    puntaje_flecha_1 = IntegerField('puntaje_flecha_1', [Optional(), NumberRange(min=0, max=10)])
    puntaje_flecha_2 = IntegerField('puntaje_flecha_2', [Optional(), NumberRange(min=0, max=10)])
    puntaje_flecha_3 = IntegerField('puntaje_flecha_3', [Optional(), NumberRange(min=0, max=10)])
    puntaje_flecha_4 = IntegerField('puntaje_flecha_4', [Optional(), NumberRange(min=0, max=10)])
    puntaje_flecha_5 = IntegerField('puntaje_flecha_5', [Optional(), NumberRange(min=0, max=10)])
    puntaje_flecha_6 = IntegerField('puntaje_flecha_6', [Optional(), NumberRange(min=0, max=10)])
    puntaje_total = IntegerField('puntaje_total')


class RondaForm(ModelForm):
    ''' Valida los datos ingresados de uno de las rondas del torneo.
    '''

    def __init__(self, model_class, object_id=None):
        super(RondaForm, self).__init__(model_class,
                                        [],
                                        object_id)


class TorneoForm(ModelForm):
    ''' Valida la data ingresada para poder crear la nueva
    informacion sobre un torneo.

    '''

    def __init__(self, model_class, object_id=None):
        super(TorneoForm, self).__init__(model_class,
                                        ['id_usuario'],
                                        object_id)

