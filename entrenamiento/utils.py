# -*- coding: utf-8 -*-

''' Tiene ciertas funciones utiles que son usadas a lo largo
del codigo
'''

import string
import random
import smtplib
from email.MIMEText import MIMEText

def random_text(size=10, chars=string.ascii_uppercase + string.digits):
    ''' Devuelve un texto creado de forma random usando los chars
    del largo especificado.

    :param int size: la cantidad de caracteres que tiene que tener el
                     resultado.

    :param str chars: los diferentes caracteres que se pueden usar
                      para generar el codigo.
    '''
    return ''.join(random.choice(chars) for _ in range(size))


class MailSender(object):
    ''' Se encarga de mandar el mail con toda la informacion
    especificada.
    '''

    def __init__(self, gmail_username, gmail_password):
        self.gmail_username = gmail_username
        self.gmail_password = gmail_password

    def send_mail(self, tos, subject, message):
        ''' Se encarga de mandar el mail.

        :param list tos: una lista de las personas que deberian recivir
                         el email.

        :param str subject: el titulo del mail

        :param str message: el contenido del mail.
        '''
        mailServer = smtplib.SMTP('smtp.gmail.com',587)
        mailServer.ehlo()
        mailServer.starttls()
        mailServer.ehlo()
        mailServer.login(self.gmail_username, self.gmail_password)
        msg = MIMEText(message)
        msg['From'] = self.gmail_username
        msg['To'] = ','.join(tos)
        msg['Subject'] = subject
        mailServer.sendmail(self.gmail_username, ','.join(tos), msg.as_string())

