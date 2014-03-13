# -*- coding: utf-8 -*-

''' Se encarga de registrar todas las instancias singleton de las
applicacion.

Esto es para evitar crear mas de una misma instancia de la clase
'''

from entrenamiento.app.app import app
from entrenamiento.utils import MailSender

#: la instancia que se va a usar para enviarle mails a los diferentes usuarios.
mail_sender = MailSender(app.config['EMAIL_USERNAME'],
                         app.config['EMAIL_PASSWORD'])
