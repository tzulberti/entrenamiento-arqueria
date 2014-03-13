# -*- coding: utf-8 -*-

from wtforms.fields import StringField
from wtforms.validators import InputRequired

from entrenamiento.views.form import ValidationForm

class InvitacionForm(ValidationForm):
    ''' Form para crear una invitacion.
    '''

    email = StringField('email', [InputRequired()])
