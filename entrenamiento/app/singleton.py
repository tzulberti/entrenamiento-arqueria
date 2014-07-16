# -*- coding: utf-8 -*-

''' Se encarga de registrar todas las instancias singleton de las
applicacion.

Esto es para evitar crear mas de una misma instancia de la clase
'''

from entrenamiento.app.app import app
from entrenamiento.models import consts_tables
from entrenamiento.models.arquero import Arquero
from entrenamiento.models.asistencia import Asistencia
from entrenamiento.models.base import BaseConstModel
from entrenamiento.models.invitacion import Invitacion
from entrenamiento.models.lugar import Lugar
from entrenamiento.models.usuario import Usuario
from entrenamiento.models.arco import Arco, ArcoRecurvado
from entrenamiento.models.pago import Pago
from entrenamiento.models.torneo import Torneo, Ronda, Serie
from entrenamiento.models.turno import Turno
from entrenamiento.models.historia_estado_arquero import HistoriaEstadoArquero


from entrenamiento.utils import MailSender, DatabaseInformation

#: la instancia que se va a usar para enviarle mails a los diferentes usuarios.
mail_sender = MailSender(app.config['EMAIL_USERNAME'],
                         app.config['EMAIL_PASSWORD'])


models = [
    Arquero,
    Asistencia,
    Invitacion,
    Lugar,
    Usuario,
    Arco,
    ArcoRecurvado,
    Pago,
    Torneo,
    Turno,
    Ronda,
    Serie,
    HistoriaEstadoArquero,
]



const_tables = []
for attr_name in dir(consts_tables):
    attr = getattr(consts_tables, attr_name)
    if not hasattr(attr, 'mro'):
        continue
    if attr == BaseConstModel:
        continue
    if BaseConstModel in attr.mro():
        const_tables.append(attr)

#: la instancia que tiene toda la informacion sobre el schema de la base de
#: datos.
database_information = DatabaseInformation(models,
                                           const_tables)
database_information.get()
