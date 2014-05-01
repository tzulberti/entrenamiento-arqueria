# -*- coding: utf-8 -*-

from flask import jsonify

from entrenamiento.views.base import UserRequiredView

class DatabaseInformationView(UserRequiredView):
    ''' Se encarga de obtener toda la informacion del schema
    de la base de datos, para que el javascript pueda hacer
    su magia.

    Ademas, levanta como constante toda la informacion de las tablas
    constantes de forma tal que evita hacer queries por esas tablas
    todo el tiempo.

    :param database_information: tiene toda la informacion sobre el
                                 schema de la base de datos.
    '''

    def __init__(self, database_information):
        super(DatabaseInformationView, self).__init__()
        self.database_information = database_information

    def get(self):
        return jsonify(res=self.database_information.information)

