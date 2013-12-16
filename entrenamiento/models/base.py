# -*- coding: utf-8- -*-

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
            res[attr_name] = getattr(self, attr_name)
        return res



