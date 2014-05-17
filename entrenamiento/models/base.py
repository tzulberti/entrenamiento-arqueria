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
            # TODO: ver si aca ya no estoy levantando toda la informacion
            # de la base de datos.
            if isinstance(value, BaseModel):
                # si es un objeto referenciado, entonces solo lo muestro
                # el dato del usuario. Esto es para evitar levantar toda
                # la base de datos cada vez que se pide algo de informacion.
                if attr_name in ('usuario'):
                    value = value.to_json()
                else:
                    continue

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


class BaseConstModel(BaseModel):
    ''' Clase base para todos los modelos que son de tablas constantes.
    Como todos ellos comparten el mismo schema, entonces la idea es
    hacer una clase base para no tener que estar difiniendo el schema
    todo el tiempo.
    '''

    __abstract__ = True
    __mapper_args__= {'always_refresh': True}

    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.Text, unique=True)
    show_order = db.Column(db.Integer, unique=True)

