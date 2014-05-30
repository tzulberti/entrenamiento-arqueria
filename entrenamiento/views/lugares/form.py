# -*- coding: utf-8 -*-

from wtforms.fields import StringField, FloatField, BooleanField
from wtforms.validators import InputRequired

from entrenamiento.views.form import ValidationForm, ValidateUnique, ValidateUniques


class LugarForm(ValidationForm):

    nombre = StringField('nombre', [InputRequired(), ValidateUnique()])
    latitud = FloatField('latitud', [InputRequired(), ValidateUniques(['latitud', 'longitud'])])
    longitud = FloatField('longitud', [InputRequired()])
    es_de_entrenamiento = BooleanField('es_de_entrenamiento')
    es_outdoor = BooleanField('es_outdoor')


