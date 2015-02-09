# -*- coding: utf-8 -*-

''' Tiene ciertas funciones utiles que son usadas a lo largo
del codigo
'''

import string
import random
import httplib2
import base64

from email.MIMEText import MIMEText
from apiclient.discovery import build
from oauth2client.client import flow_from_clientsecrets
from oauth2client.file import Storage
from oauth2client.tools import run


from entrenamiento.models.base import BaseModel
from sqlalchemy.sql.sqltypes import Integer, Float, Date, String, Text, Boolean, Time

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

    En de vez de usar el SMTPLib y conectarse a GMail, el mismo esta usando
    la API para mandar los mails. Se puede ver informacion de lo que hice
    aca:

    http://stackoverflow.com/questions/25944883/how-to-send-an-email-through-gmail-without-enabling-insecure-access

    :param client_secret_file: el path en donde esta el archivo .json con las
                               credenciales para poder mandar mails

    :param str username: la direccion de mail que manda el mail en cuestion
    '''

    def __init__(self, client_secret_file, username):
        # Check https://developers.google.com/gmail/api/auth/scopes for all available scopes
        OAUTH_SCOPE = 'https://www.googleapis.com/auth/gmail.compose'

        # Location of the credentials storage file
        STORAGE = Storage('gmail.storage')

        # Start the OAuth flow to retrieve credentials
        flow = flow_from_clientsecrets(client_secret_file, scope=OAUTH_SCOPE)
        http = httplib2.Http()

        # Try to retrieve credentials from storage or run the flow to generate them
        credentials = STORAGE.get()
        if credentials is None or credentials.invalid:
            credentials = run(flow, STORAGE, http=http)

        # Authorize the httplib2.Http object with our credentials
        http = credentials.authorize(http)

        # Build the Gmail service from discovery
        self.gmail_service = build('gmail', 'v1', http=http)


    def send_mail(self, tos, subject, message):
        ''' Se encarga de mandar el mail.

        :param list tos: una lista de las personas que deberian recivir
                         el email.

        :param str subject: el titulo del mail

        :param str message: el contenido del mail.
        '''

        message = MIMEText(message)
        message['to'] = ','.join(tos)
        message['from'] = self.username
        message['subject'] = subject
        body = {'raw': base64.b64encode(message.as_string())}

        # send it
        message = (self.gmail_service.users().messages().send(userId="me", body=body).execute())


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
            self.get_columns(model)


    def get_columns(self, model):
        ''' Se encarga de obtener toda la informacion de todas las columnas
        que tiene el modelo.

        En caso de que el modelo extienda de otro, entonces esta funcion
        se va a llamar recursivamente.
        '''
        if model.__tablename__ in self.information:
            # en este caso ya se lo habia calculado por lo que
            # devuelvo las columnas del mismo. Esto puede llegar
            # a pasar con las clases bases
            return self.information[model.__tablename__]

        columns = []
        self.information[model.__tablename__] = columns
        if not (model.__base__ == BaseModel):
            # entonces la clase que estoy viendo hereda de otra
            # clase, y por lo tanto le tengo que agregar la informacion
            # de las columnas a esta
            base_model = model.__base__
            if not base_model.__tablename__:
                raise Exception('las clases bases deberian ir primero')

            base_model_columns = self.get_columns(base_model)
            columns.extend(base_model_columns)

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
                raise Exception('estoy al horno')
            elif foreign_keys:
                column_data['foreign_key'] = foreign_keys[0]
            else:
                column_data['foreign_key'] = None

            const_values = None
            if column_data['foreign_key']:
                # me fijo si la fk es una que apunta a las tablas
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
        return columns

    def get_type(self, column_type):
        if isinstance(column_type, (Integer, Float)):
            return 'number'
        elif isinstance(column_type, Text):
            return 'textarea'
        elif isinstance(column_type, String):
            return 'text'
        elif isinstance(column_type, Date):
            return 'date'
        elif isinstance(column_type, Time):
            return 'time'
        elif isinstance(column_type, Boolean):
            return 'boolean'

