# -*- coding: utf-8 -*-

''' Tiene ciertas funciones utiles que son usadas a lo largo
del codigo
'''

import string
import random
import smtplib
from email.MIMEText import MIMEText

from sqlalchemy.sql.sqltypes import Integer, Float, Date, String, Text, Boolean


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


class DatabaseInformation(object):
    ''' Se encarga de obtener toda la informacion del schema
    de la base de datos, para que el javascript pueda hacer
    su magia.

    Ademas, levanta como constante toda la informacion de las tablas
    constantes de forma tal que evita hacer queries por esas tablas
    todo el tiempo.


    :param list(BaseModel) models: todos los modelos de la aplicacion
                                   con los que se esta trabajando.

    :param list(str) const_tables: el nombre de la tabla que es constante.
    '''

    def __init__(self, models, const_tables):
        self.models = models
        self.const_tables = const_tables

        self.information = dict()

    def get(self):
        for model in self.models:
            columns = []
            self.information[model.__tablename__] = columns
            for column_information in model.__table__.columns:
                column_data = dict(name=column_information.key,
                                   type=self.get_type(column_information.type),
                                   primary_key=column_information.primary_key)

                foreign_keys = []
                for data in column_information.foreign_keys:
                    reference_information = data.target_fullname
                    referenced_table = reference_information.split('.')[0]
                    foreign_keys.append(referenced_table)

                if len(foreign_keys) > 1:
                    raise Exception('Estoy al horno')
                elif foreign_keys:
                    column_data['foreign_key'] = foreign_keys[0]
                else:
                    column_data['foreign_key'] = None

                columns.append(column_data)


    def get_type(self, column_type):
        if isinstance(column_type, (Integer, Float)):
            return 'number'
        elif isinstance(column_type, (String, Text)):
            return 'text'
        elif isinstance(column_type, Date):
            return 'date'
        elif isinstance(column_type, Boolean):
            return 'boolean'

