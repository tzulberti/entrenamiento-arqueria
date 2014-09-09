# -*- coding: utf-8 -*-

from flask.ext.script import Command, Option


class RunServer(Command):
    ''' Se encarga de levantar el servidor web.
    '''

    option_list = (
        Option('--port', '-p', dest='port', default=8000, type=int),
    )

    def run(self, port):
        from entrenamiento.app.app import app, db, bcrypt
        from entrenamiento.views.register import register_views
        register_views(app, db, bcrypt)
        app.run(port=port, host='0.0.0.0')
