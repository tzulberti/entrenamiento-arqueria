# -*- coding: utf-8 -*-

from csv import DictReader
from datetime import date
from flask.ext.script import Command, Option

from entrenamiento.app.app import db
from entrenamiento.utils import  random_text
from entrenamiento.models.arquero import Arquero
from entrenamiento.models.usuario import Usuario
# esto lo tengo que levantar para asegurarme de que levante todos los modelos de sqlalchemy
from entrenamiento.app.singleton import database_information

class ImportUsers(Command):
    ''' Se encarga de importar los usuarios a partir de un CSV
    '''

    option_list = (
        Option('--csv-path',  dest='csv_path'),
    )

    def run(self, csv_path):
        with open(csv_path) as input_file:
            reader = DictReader(input_file)
            for data in reader:
                try:
                    query = Arquero.query
                    query = query.filter(Arquero.email == data['E-Mail'])
                    existente = query.first()
                    if not existente:
                        arquero = Arquero(
                            nombre=data['Nombres'],
                            apellido=data['Apellido'],
                            email=data['E-Mail'],
                            codigo=random_text(10)
                        )
                        db.session.add(arquero)
                        db.session.commit()
                    else:
                        arquero = existente

                    usuario = Usuario(
                        id_arquero=arquero.id,
                        password=random_text(10),
                        es_administrador=False,
                        fecha_ingreso=date.today(),
                        fecha_abandono=None,
                        telefono=data['Tel\xc3\xa9fono'],
                        celular=data['Celular'],
                        direccion=data['Direcci\xc3\xb3n'],
                        id_dominancia_ojo=1,
                        id_dominancia_mano=1)

                    db.session.add(usuario)
                    db.session.commit()
                except Exception, e:
                    import ipdb; ipdb.set_trace()

