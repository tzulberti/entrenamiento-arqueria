# -*- coding: utf-8 -*-

from flask.ext.wtf import Form
from wtforms.fields import Field

class ValidationForm(Form):
    ''' Form basico para validar todos los casos para tener en cuenta el
    tema de los campos que tienen que ser unique.

    Esto se lo hace como una clase base para tener en cuenta el caso
    en el que el usuario este editando una instancia, y por lo
    tanto se lo tiene que tener en cuenta cuando se edita una
    instancia.

    '''

    def __init__(self, model_class, object_id=None):
        super(ValidationForm, self).__init__()
        self.model_class = model_class
        self.object_id = object_id


    def validate_unique(self, attr_name, message=None):
        ''' Valida que el campo sea unico teniendo en cuenta
        si se estaba editando una instancia o si se estaba
        creando una nueva instancia.
        '''
        model_attr = getattr(self.model_class, attr_name)
        form_attr = getattr(self, attr_name)
        query = self.model_class.query
        query = query.filter(model_attr == form_attr.data)
        data = query.first()
        if not data:
            # sino existe un valor, entonces no se puede estar
            # rompiendo el caso de unique
            return True

        if not self.object_id:
            # en este caso el usuario estaba creando una instancia
            # y ya existe un valor en la base de datos con esa informacion
            form_attr.errors.append(message or 'Este campo tiene que ser unico')
            return False

        if data.id != self.object_id:
            # en este caso el usuario estaba editando una instancia
            # pero le puso el valor de otra instancia de la base de
            # datos.
            form_attr.errors.append(message or 'Este campo tiene que ser unico')
            return False

        return True


    def validate_uniques(self, attr_names, message=None):
        ''' Similar al anterior, pero esto se basa en que dos o mas campos
        juntos tienen que ser unicos.
        '''
        model_attrs = []
        form_attrs = []
        for attr_name in attr_names:
            model_attrs.append(getattr(self.model_class, attr_name))
            form_attrs.append(getattr(self, attr_name))

        query = self.model_class.query
        # usar itertools
        for index in range(len(attr_names)):
            query = query.filter(model_attrs[index] == form_attrs[index].data)
        data = query.first()
        if not data:
            return True


        error_message = 'Ya existe un valor con la data de %s' % (', '.join(attr_names))
        if not self.object_id:
            # en este caso el usuario estaba creando una nueva instancia,
            # pero ya existe una con esos datos.
            for form_attr in form_attrs:
                form_attr.errors.append(error_message)
                return False

        if data.id != self.object_id:
            for form_attr in form_attrs:
                form_attr.errors.append(error_message)
                return False
        return True


    def get_instance(self):
        ''' Se encarga de crear una instancia una vez que se hayan validado todas
        las cosas teniendo en cuenta de si el usuario quiere crear una nueva
        o si simplemente quiere editar una.
        '''
        if self.object_id:
            model_attr = getattr(self.model_class, 'id')
            query = self.model_class.query.filter(model_attr == self.object_id)
            return query.first()
        else:
            kwargs = dict()
            for attr_name in dir(self):
                if attr_name == 'csrf_token':
                    continue
                attr = getattr(self, attr_name)
                if isinstance(attr, Field):
                    kwargs[attr_name] = attr.data

            return self.model_class(**kwargs)






