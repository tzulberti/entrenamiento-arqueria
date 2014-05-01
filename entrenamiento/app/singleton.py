# -*- coding: utf-8 -*-

''' Se encarga de registrar todas las instancias singleton de las
applicacion.

Esto es para evitar crear mas de una misma instancia de la clase
'''

from entrenamiento.app.app import app
from entrenamiento.models.invitacion import Invitacion
from entrenamiento.models.lugar import Lugar
from entrenamiento.models.usuario import Usuario
from entrenamiento.models.arco import Arco, ArcoRecurvado
from entrenamiento.models.pago import Pago
from entrenamiento.models.torneo import Torneo, Ronda, Serie
from entrenamiento.models.consts_tables import LargoRiser, LargoPalas

from entrenamiento.utils import MailSender, DatabaseInformation

#: la instancia que se va a usar para enviarle mails a los diferentes usuarios.
mail_sender = MailSender(app.config['EMAIL_USERNAME'],
                         app.config['EMAIL_PASSWORD'])


models = [
    Invitacion,
    Lugar,
    Usuario,
    Arco,
    ArcoRecurvado,
    Pago,
    Torneo,
    Ronda,
    Serie
]

const_tables = [
    LargoRiser,
    LargoPalas
]

#: la instancia que tiene toda la informacion sobre el schema de la base de
#: datos.
database_information = DatabaseInformation(models,
                                           const_tables)
database_information.get()
