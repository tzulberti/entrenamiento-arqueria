# -*- coding:utf -*-

from entrenamiento.app.app import app, bcrypt, db
from entrenamiento.views.register import register_views


def run_server():
    register_views(app, db, bcrypt)
    app.run()


if __name__ == '__main__':
    run_server()
