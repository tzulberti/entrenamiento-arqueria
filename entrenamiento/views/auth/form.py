# -*- coding: utf-8- -*-

from wtforms.fields import StringField, BooleanField
from wtforms.validators import InputRequired

from entrenamiento.app.app import bcrypt
from entrenamiento.views.form import ValidationForm

class UserForm(ValidationForm):
    ''' Tiene toda la data del form de cuando se esta creando
    o editando un :class:`entrenamiento.models.user.User`

    '''

    username = StringField('username', [InputRequired()])
    email = StringField('email', [InputRequired()])
    nombre = StringField('nombre', [InputRequired()])
    apellido = StringField('apellido', [InputRequired()])
    password = StringField('password', [InputRequired()])
    es_entrenador = BooleanField('es_entrenador')
    es_administrador = BooleanField('es_administrador')


    def validate(self):
        rv = super(UserForm, self).validate()
        if not rv:
            return False

        # me fijo que no exista otro lugar con el mismo nombre
        if not self.validate_unique('email'):
            return False

        if not self.validate_unique('username'):
            return False

        self.instance = self.get_instance()
        return True

    def get_attr_value(self, attr_name, form_data):
        ''' Se encarga de codificar el password que vino por el request.

        Todo el resto de la informacion lo deja talcual.
        '''
        if attr_name != 'password':
            return super(UserForm, self).get_attr_value(attr_name, form_data)

        return bcrypt.generate_password_hash(form_data)
