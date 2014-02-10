# -*- coding: utf-8- -*-

from datetime import datetime, date
from entrenamiento.app.app import db

class BaseModel(db.Model):
    ''' Clase base a partir de la cual todos los otros modelos tienen
    que extender. Esto es para evitar estar sobrescribiendo el
    tema de "to_json" todo el tiempo.
    '''

    __abstract__ = True

    def to_json(self):
        attributes = dir(self)
        attributes = filter(lambda attr_name: not attr_name.startswith('_'),
                            attributes)

        res = dict()
        for attr_name in attributes:
            if attr_name in ('query', 'to_json', 'query_class', 'metadata'):
                continue
            if attr_name in ('usuario'):
                # en este caso lo decodifico porque generalmente tengo que exportarlo
                # para poder mostrarlo por la pantalla
                res[attr_name] = getattr(self, attr_name).to_json()
            else:
                value = getattr(self, attr_name)
                if isinstance(value, (date, datetime)):
                    value = value.strftime('%d/%m/%Y')
                res[attr_name] = value
        return res



