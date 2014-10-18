# -*- coding: utf-8 -*-

from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.bcrypt import Bcrypt
from flask.ext.wtf.csrf import CsrfProtect

from entrenamiento.app.logging_config import logging_configuration

def create_app():
    ''' Se encarga de crear la applicaciones de flask.

    Para esto, va a usar la configuracion correspondiente
    al hostname que el mismo esta usando.
    '''
    app = Flask(__name__,
                template_folder='../templates/',
                static_folder='../static')
    app.config.from_envvar('ENTRENAMIENTO_CONFIGURATION')
    db = SQLAlchemy(app)
    bcrypt = Bcrypt(app)
    csrf = CsrfProtect()
    csrf.init_app(app)
    logging_configuration(app)
    return (app, db, bcrypt)


app, db, bcrypt = create_app()
