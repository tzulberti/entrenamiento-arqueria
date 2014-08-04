# -*- coding: utf-8- -*-

from flask.ext.wtf import Form
from wtforms.fields import (StringField, DateField,
                            FileField, PasswordField,
                            FloatField)
from wtforms.ext.sqlalchemy.fields import QuerySelectField
from wtforms.validators import InputRequired, Email, Optional, EqualTo

from entrenamiento.app.app import bcrypt
from entrenamiento.models.consts_tables import DominanciaOjo, DominanciaMano
from entrenamiento.views.form import ValidationForm, ValidateUnique


class ChangePasswordForm(Form):
    ''' Form usada para que el usuario cambie su password.
    '''
    password = PasswordField('password',
                             validators=[InputRequired()],
                             description='El password que usas para loguearte')
    new_password = PasswordField('new_password',
                                  validators=[InputRequired(), EqualTo('password_confirmation')],
                                  description='El nuevo password que vas a usar para loguearte')
    password_confirmation = PasswordField('password_confirmation',
                                          validators=[InputRequired()],
                                          description='La confirmacion del nuevo password')



class UserForm(ValidationForm):
    ''' Tiene toda la data del form de cuando se esta creando
    o editando un :class:`entrenamiento.models.user.User`

    '''

    # TODO falta validar que el email sea unico
    email = StringField('email',
                        validators=[InputRequired(), Email()],
                        description='El email con el que te vas a loguear al sistema')
    nombre = StringField('nombre', [InputRequired()])
    apellido = StringField('apellido', [InputRequired()])
    password = PasswordField('password',
                             validators=[InputRequired(), EqualTo('password_confirmation')],
                             description='El password que vas a usar para loguearte en el sistema')
    password_confirmation = PasswordField('password_confirmation',
                                          validators=[InputRequired()],
                                          description='El mismo password que ingresaste arriba')
    foto_archivo = FileField('foto_archivo',
                             description='Una foto tuya. No es necesario este campo')
    fecha_ingreso = DateField('fecha_ingreso',
                              format='%d/%m/%Y',
                              validators=[Optional()],
                              description='Cuando empezaste en la EDA')
    fecha_nacimiento = DateField('fecha_nacimiento',
                                 format='%d/%m/%Y',
                                 validators=[Optional()])
    dni = StringField('dni')
    telefono = StringField('telefono')
    celular = StringField('celular')
    direccion = StringField('direccion')
    localidad = StringField('localidad')
    apodo_eda = StringField('apodo_eda')
    latitud = FloatField('latitud', validators=[Optional()])
    longitud = FloatField('longitud', validators=[Optional()])
    dominancia_ojo = QuerySelectField('dominancia_ojo',
                                       description='Cual es el ojo con el que apuntas?',
                                       query_factory=DominanciaOjo.query.all,
                                       get_label='value',
                                       allow_blank=True)
    dominancia_mano = QuerySelectField('dominancia_mano',
                                        query_factory=DominanciaMano.query.all,
                                        get_label='value',
                                        description='Cual es la mano que usas para hacer las cosas genearlmente (comer, escribir, etc...)?',
                                        allow_blank=True)


    def get_attr_value(self, attr_name, form_data):
        ''' Se encarga de codificar el password que vino por el request.

        Todo el resto de la informacion lo deja talcual.
        '''
        if attr_name != 'password':
            return super(UserForm, self).get_attr_value(attr_name, form_data)

        return bcrypt.generate_password_hash(form_data)

    def get_instance(self):
        res = super(UserForm, self).get_instance(['password_confirmation',
                                                  'foto_archivo',
                                                  'dominancia_ojo',
                                                  'dominancia_mano',
                                                  'nombre',
                                                  'apellido',
                                                  'email'])
        if self.dominancia_ojo.data:
            res.id_dominancia_ojo = self.dominancia_ojo.data.id
        if self.dominancia_mano.data:
            res.id_dominancia_mano = self.dominancia_mano.data.id
        return res

