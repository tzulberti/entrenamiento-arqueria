# -*- coding: utf-8 -*-

from flask import jsonify
from sqlalchemy.sql.sqltypes import Integer, Float, Date, String, Text, Boolean

from entrenamiento.views.base import UserRequiredView

class DatabaseInformationView(UserRequiredView):
    ''' Se encarga de obtener toda la informacion del schema
    de la base de datos, para que el javascript pueda hacer
    su magia.
    '''

    def __init__(self, models):
        self.models = models

    def get(self):
        res = dict()
        for model in self.models:
            columns = []
            res[model.__tablename__] = columns
            for column_information in model.__table__.columns:

                columns.append(dict(name=column_information.key,
                                    type=self.get_type(column_information.type)))

        return jsonify(res=res)

    def get_type(self, column_type):
        if isinstance(column_type, (Integer, Float)):
            return 'number'
        elif isinstance(column_type, (String, Text)):
            return 'text'
        elif isinstance(column_type, Date):
            return 'date'
        elif isinstance(column_type, Boolean):
            return 'boolean'

