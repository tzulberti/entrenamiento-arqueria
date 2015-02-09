# -*- coding: utf-8 -*-

''' Se encarga de registrar todas las instancias singleton de las
applicacion.

Esto es para evitar crear mas de una misma instancia de la clase
'''

import importlib
import os
import pkgutil
from entrenamiento.app.app import app
from entrenamiento import models
from entrenamiento.models.base import BaseConstModel, BaseModel
from entrenamiento.models import consts_tables
from entrenamiento.utils import MailSender, DatabaseInformation

#: la instancia que se va a usar para enviarle mails a los diferentes usuarios.
mail_sender = MailSender(app.config['EMAIL_SECRET_FILE'],
                         app.config['EMAIL_USERNAME'])


models_klass = set()
models_path = os.path.dirname(models.__file__)
models_modules_names = [name for _, name, _ in pkgutil.iter_modules([models_path])]
models_modules_names.remove('base')
models_modules_names.remove('consts_tables')
for module_name in models_modules_names:
    module = importlib.import_module('entrenamiento.models.%s' % module_name)
    for attr_name in dir(module):
        attr = getattr(module, attr_name)
        if not hasattr(attr, 'mro'):
            continue
        if attr == BaseConstModel:
            continue
        if attr == BaseModel:
            continue
        if BaseModel in attr.mro():
            models_klass.add(attr)


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
database_information = DatabaseInformation(list(models_klass),
                                           const_tables)
database_information.get()



