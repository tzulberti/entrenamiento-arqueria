# -*- coding: utf-8 -*-

from wtforms.fields import (StringField, IntegerField, BooleanField,
                            DateField)
from wtforms.validators import InputRequired, Optional, NumberRange

from entrenamiento.views.form import ValidationForm



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


class RondaForm(ValidationForm):
    ''' Valida los datos ingresados de uno de las rondas del torneo.
    '''

    id_torneo = IntegerField('id_torneo', [InputRequired()])
    puntaje = IntegerField('puntaje', [Optional()])
    distancia = IntegerField('distancia', [Optional()])
    foto = StringField('foto', [Optional()])

class TorneoForm(ValidationForm):
    ''' Valida la data ingresada para poder crear la nueva
    informacion sobre un torneo.

    '''

    cuando = DateField('cuando', [InputRequired()], format='%d/%m/%Y')
    id_lugar = IntegerField('id_lugar', [Optional()])
    id_arco = IntegerField('id_arco', [Optional()])
    comentario = StringField('comentario', [Optional()])
    tipo_de_torneo = StringField('tipo_de_torneo', [InputRequired()])
    puntaje_final_torneo = IntegerField('puntaje_final_torneo', [Optional()])
    fue_practica = BooleanField('fue_practica', [Optional()])

