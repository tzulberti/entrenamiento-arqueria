# -*- coding: utf-8 -*-

''' Se encarga de configurar todo el tema de logging para tener
en cuenta cuando hay algun error en la aplicacion
'''

import logging

def logging_configuration(app):
    if app.debug:
        logging.basicConfig()
        logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)
    else:
        raise Exception('SE tiene que hacer algo mas serio')
