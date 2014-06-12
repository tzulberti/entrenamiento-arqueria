# -*- coding: utf-8 -*-

''' Tiene ciertas funciones utiles que son usadas a lo largo
del codigo
'''

import string
import random
import smtplib
from email.MIMEText import MIMEText

from entrenamiento.models.base import BaseModel
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

    :param list(BaseModel) const_tables: el nombre de la tabla que es constante.
    '''

    def __init__(self, models, const_tables):
        self.models = models
        self.const_tables = const_tables

        self.information = dict()

    def get(self):
        for model in self.models:
            columns = []
            self.information[model.__tablename__] = columns
            if not (model.__base__ == BaseModel):
                # entonces la clase que estoy viendo hereda de otra
                # clase, y por lo tanto le tengo que agregar la informacion
                # de las columnas a esta
                base_model = model.__base__
                if not base_model.__tablename__:
                    raise Exception('Las clases bases deberian ir primero')

                columns.extend(self.information[base_model.__tablename__])

            for column_information in model.__table__.columns:

                column_data = dict(name=column_information.key,
                                   type=self.get_type(column_information.type),
                                   primary_key=column_information.primary_key,
                                   nullable=column_information.nullable)

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

                const_values = None
                if column_data['foreign_key']:
                    # me fijo si la FK es una que apunta a las tablas
                    # que son constantes, y si es asi, busco la informacion
                    # de la misma
                    for const_model in self.const_tables:
                        if const_model.__tablename__ == column_data['foreign_key']:
                            values = const_model.query.all()
                            const_values = []
                            for value in values:
                                const_values.append(dict(id=value.id,
                                                         value=value.value,
                                                         show_order=value.show_order))

                column_data['const_values'] = const_values



                columns.append(column_data)


    def get_type(self, column_type):
        if isinstance(column_type, (Integer, Float)):
            return 'number'
        elif isinstance(column_type, Text):
            return 'textarea'
        elif isinstance(column_type, String):
            return 'text'
        elif isinstance(column_type, Date):
            return 'date'
        elif isinstance(column_type, Boolean):
            return 'boolean'

