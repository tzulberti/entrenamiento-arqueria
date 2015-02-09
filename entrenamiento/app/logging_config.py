# -*- coding: utf-8 -*-

''' Se encarga de configurar todo el tema de logging para tener
en cuenta cuando hay algun error en la aplicacion
'''

import logging
import logging.handlers


class TlsSMTPHandler(logging.handlers.SMTPHandler):
    ''' Se encarga de mandar la informacion de la excepcion por mail
    a los developers de forma tal que nos enteremos si hubo alguna
    clase de error
    '''

    def emit(self, record):
        # lo tengo que meter aca porque sino tengo un import
        # ciclico
        from entrenamiento.app.singleton import mail_sender
        mail_sender.send_mail(['tzulberti@gmail.com'],
                              '[Entrenamiento App] Error',
                              self.format(record))

def logging_configuration(app):
    if app.debug:
        logging.basicConfig()
        logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)
    else:
        gm = TlsSMTPHandler(("smtp.gmail.com", 587),
                             'data@falsa.com',
                             ['data@falsa.com'],
                             'Error found!',
                             ('data@falsa.com', 'data@falsa.com'))
        gm.setLevel(logging.ERROR)

        formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        ch = logging.StreamHandler()
        ch.setLevel(logging.DEBUG)
        ch.setFormatter(formatter)

        logger = logging.getLogger('entrenamiento')
        logger.setLevel(logging.DEBUG)
        logger.addHandler(gm)
        logger.addHandler(ch)

        logging.basicConfig()
        logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

