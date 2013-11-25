# -*- coding: utf-8 -*-

from wtforms.fields import StringField, FloatField, BooleanField
from wtforms.validators import InputRequired

from entrenamiento.views.form import ValidationForm


class LugarForm(ValidationForm):

    nombre = StringField('nombre', [InputRequired()])
    latitud = FloatField('latitud', [InputRequired()])
    longitud = FloatField('longitud', [InputRequired()])
    es_de_entrenamiento = BooleanField('es_de_entrenamiento')

    def validate(self):
        rv = super(LugarForm, self).validate()
        if not rv:
            return False

        # me fijo que no exista otro lugar con el mismo nombre
        if not self.validate_unique('nombre'):
            return False

        if not self.validate_uniques(['latitud', 'longitud']):
            return False


        self.instance = self.get_instance()
        return True

