# -*- coding: utf-8 -*-

from flask.ext.script import Manager
from entrenamiento.app.app import app
from entrenamiento.commands.import_users import ImportUsers
from entrenamiento.commands.run_server import RunServer

def main():
    manager = Manager(app, with_default_commands=False)
    manager.add_command('run-server', RunServer())
    manager.add_command('import-users', ImportUsers())
    manager.run()

