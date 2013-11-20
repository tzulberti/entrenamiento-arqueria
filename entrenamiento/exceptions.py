# -*- coding: utf-8 -*-

class ValidationError(Exception):
    ''' Usada cuando se intento de crear un modelo usando data
    que era invalida.

    :param str fieldname: el nombre del attributo del modelo que tiene
                          un valor invalido.


    :param str message: el mensaje que indica porque el valor del modelo
                        era invalido.
    '''

    def __init__(self, fieldname, message):
        super(ValidationError, self).__init__(message)
        self.fieldname = fieldname
        self.errors = dict(fieldname=message)

