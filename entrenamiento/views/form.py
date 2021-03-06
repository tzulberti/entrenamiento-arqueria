# -*- coding: utf-8 -*-

from flask.ext.wtf import Form
from sqlalchemy.sql.sqltypes import Integer, Float, Date, String, Text, Boolean, Time
from wtforms.fields import (Field, StringField, IntegerField, TextAreaField,
                            BooleanField, DateField, FloatField)
from wtforms.validators import ValidationError, InputRequired, Optional

from entrenamiento.models.base import BaseModel
from entrenamiento.views.utils import TimeField

class ValidateUnique(object):
    ''' Valida que el campo sea unico teniendo en cuenta
    si se estaba editando una instancia o si se estaba
    creando una nueva instancia.
    '''

    def __init__(self, message=None):
        self.message = message or 'Este campo tiene que ser unico'

    def __call__(self, form, field):
        model_attr = getattr(form.model_class, field.name)
        query = form.model_class.query
        query = query.filter(model_attr == field.data)
        data = query.first()
        if not data:
            # sino existe un valor, entonces no se puede estar
            # rompiendo el caso de unique
            return True

        if not form.object_id:
            # en este caso el usuario estaba creando una instancia
            # y ya existe un valor en la base de datos con esa informacion
            raise ValidationError(self.message)

        if data.id != form.object_id:
            # en este caso el usuario estaba editando una instancia
            # pero le puso el valor de otra instancia de la base de
            # datos.
            raise ValidationError(self.message)

class ValidateUniques(object):
    ''' Similar al anterior, pero esto se basa en que dos o mas campos
    juntos tienen que ser unicos.
    '''

    def __init__(self, attr_names, message=None):
        self.attr_names = attr_names
        self.message = message or ('Ya existe un valor con la data de %s' % (', '.join(attr_names)))

    def __call__(self, form, field):
        model_attrs = []
        form_attrs = []
        for attr_name in self.attr_names:
            model_attrs.append(getattr(form.model_class, attr_name))
            form_attrs.append(getattr(form, attr_name))

        query = form.model_class.query
        # usar itertools
        for index in range(len(self.attr_names)):
            query = query.filter(model_attrs[index] == form_attrs[index].data)
        data = query.first()
        if not data:
            return True


        if not form.object_id:
            # en este caso el usuario estaba creando una nueva instancia,
            # pero ya existe una con esos datos.
            raise ValidationError(self.message)

        if data.id != form.object_id:
            raise ValidationError(self.message)


class ValidationForm(Form):
    ''' Form basico para validar todos los casos para tener en cuenta el
    tema de los campos que tienen que ser unique.

    Esto se lo hace como una clase base para tener en cuenta el caso
    en el que el usuario este editando una instancia, y por lo
    tanto se lo tiene que tener en cuenta cuando se edita una
    instancia.

    '''

    def __init__(self, model_class, object_id=None, **kwargs):
        super(ValidationForm, self).__init__(**kwargs)
        self.model_class = model_class
        self.object_id = object_id


    def validate(self):
        res = super(ValidationForm, self).validate()
        if not res:
            return False
        self.instance = self.get_instance()
        return True

    def get_instance(self, skip_fieldnames=[]):
        ''' Se encarga de crear una instancia una vez que se hayan validado todas
        las cosas teniendo en cuenta de si el usuario quiere crear una nueva
        o si simplemente quiere editar una.
        '''
        if self.object_id:
            model_attr = getattr(self.model_class, 'id')
            query = self.model_class.query.filter(model_attr == self.object_id)
            res = query.first()

        else:
            res = self.model_class()

        # ahora le tengo que setear todos los valores que fueron
        # encontrador por el usuario
        for attr_name in dir(self):
            if attr_name == 'csrf_token':
                continue
            if attr_name in skip_fieldnames:
                continue
            if not hasattr(self, attr_name):
                continue
            attr = getattr(self, attr_name)
            if isinstance(attr, Field):
                final_value = self.get_attr_value(attr_name, attr.data)
                if not hasattr(res, attr_name):
                    raise Exception('Ocurrio un error con el campo: %s' % attr_name)
                setattr(res, attr_name, final_value)
        return res

    def get_attr_value(self, attr_name, form_data):
        ''' En funcion del form data convierte el valor de la forma en la
        que el mismo se tiene que guardar en la base de datos.

        :param str attr_name: el nombre del attributo que se quiere setear
                              en la instnacia del modelo.

        :param object form_data: el valor que fue leido del form.
        '''
        return form_data




class ModelForm(ValidationForm):
    ''' Se encarga de crear el form teniendo en cuenta todos campos que
    tiene el modelo de la base de datos.

    :param list(str) ignore_columns: los nombres de las columnas que no
                                     van a formar parte de form.
    '''

    def __init__(self, model_class, ignore_columns=[], object_id=None):
        self.ignore_columns = ignore_columns
        fields = self.convert_sqlalchemy_information(model_class)
        if not (model_class.__base__ == BaseModel):
            fields.extend(self.convert_sqlalchemy_information(model_class.__base__))

        self.__class__._unbound_fields = fields
        super(ModelForm, self).__init__(model_class, object_id)

    def convert_sqlalchemy_information(self, model_class):
        ''' Se encarga de convertir toda la informacion del modelo de SQLAlchemy
        a un form de WTForm.

        Para esto, se fija los siguientes attributos del field:

        - Si puede llegar a ser nullable
        - Si es unique
        - Si es primary key

        Ademas, en funcion del tipo de columna el tipo de field que va a usar.
        '''
        res = []
        for column_information in model_class.__table__.columns:
            if column_information.primary_key:
                # no pongo la primary key en el form porque la misma forma
                # parte de la url que recive el usuario
                continue

            if column_information.key in self.ignore_columns:
                # en este caso se quiere ignorar el campo.
                continue

            field_class = None
            field_kwargs = dict()
            if isinstance(column_information.type, Integer):
                field_class = IntegerField
            elif isinstance(column_information.type, Float):
                field_class = FloatField
            elif isinstance(column_information.type, Text):
                field_class = TextAreaField
            elif isinstance(column_information.type, String):
                field_class = StringField
            elif isinstance(column_information.type, Date):
                field_class = DateField
                field_kwargs = dict(format='%d/%m/%Y')
            elif isinstance(column_information.type, Boolean):
                field_class = BooleanField
            elif isinstance(column_information.type, Time):
                field_class = TimeField

            validators = []
            if column_information.nullable:
                validators.append(Optional())
            elif field_class != BooleanField:
                validators.append(InputRequired())
            if column_information.unique:
                validators.append(ValidateUnique())


            res.append((column_information.key,
                        field_class(column_information.key, validators=validators, **field_kwargs)))
        return res

