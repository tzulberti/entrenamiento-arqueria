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
            value = getattr(self, attr_name)
            if isinstance(value, BaseModel):
                # en este caso lo decodifico porque generalmente tengo que exportarlo
                # para poder mostrarlo por la pantalla
                value = value.to_json()
            elif isinstance(value, (date, datetime)):
                value = value.strftime('%d/%m/%Y')

            elif isinstance(value, list):
                if value:
                    if isinstance(value[0], BaseModel):
                        # en caso de que se quiera mandar informacion sobre la lista
                        # de relaciones eso no me interesa para la tabla, asique
                        # las ignoro
                        value = []
                    else:
                        # sino es una lista de relaciones, es algo muy raro por lo que
                        # envio la informacion por si las moscas
                        value = value

            res[attr_name] = value
        return res



