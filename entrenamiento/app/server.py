# -*- coding:utf -*-

from entrenamiento.app.app import app
from entrenamiento.views.register import register


register(app, '/api/v01')
app.run()
