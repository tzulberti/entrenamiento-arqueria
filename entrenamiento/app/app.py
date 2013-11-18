# -*- coding: utf-8 -*-

from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.bcrypt import Bcrypt
from socket import gethostname

from entrenamiento_arqueria.app.configuration import get_configuration
from entrenamiento_arqueria.views.register import register

def create_app():
    ''' Se encarga de crear la applicaciones de flask.

    Para esto, va a usar la configuracion correspondiente
    al hostname que el mismo esta usando.
    '''
    configuration = get_configuration(gethostname())
    app = Flask(configuration)
    db = SQLAlchemy(app)
    bcrypt = Bcrypt(app)
    return (app, db, bcrypt)

app, db, bcrypt = create_app()
register(app, '/api/v01')
