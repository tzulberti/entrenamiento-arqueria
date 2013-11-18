# -*- coding: utf-8 -*-

from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.bcrypt import Bcrypt
from socket import gethostname

from entrenamiento.app.configuration import get_configuration

def create_app():
    ''' Se encarga de crear la applicaciones de flask.

    Para esto, va a usar la configuracion correspondiente
    al hostname que el mismo esta usando.
    '''
    configuration = get_configuration(gethostname())
    app = Flask(__name__,
                template_folder='../templates/',
                static_folder='../static')
    app.config.from_object(configuration)
    db = SQLAlchemy(app)
    bcrypt = Bcrypt(app)
    return (app, db, bcrypt)

app, db, bcrypt = create_app()
