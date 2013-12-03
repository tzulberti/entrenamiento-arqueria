# -*- coding:utf -*-

import os
from flask import send_from_directory


from entrenamiento.app.app import app, db
from entrenamiento.models.lugar import Lugar
from entrenamiento.models.user import User
from entrenamiento.views.base import (BaseModelListCrudView,
                                      BaseModelCrudView)
from entrenamiento.views.auth.auth import LoginView
from entrenamiento.views.auth.form import UserForm
from entrenamiento.views.index import IndexViewTemplate
from entrenamiento.views.lugares.form import LugarForm


#: la url que forma parte de la base de las API Rest
BASE_API_URL = '/api/v01/'

app.add_url_rule('/login/',
                 view_func=LoginView.as_view('auth.login'))
app.add_url_rule('/',
                 view_func=IndexViewTemplate.as_view('index'))
app.add_url_rule(BASE_API_URL + 'lugar/',
                 view_func=BaseModelListCrudView.as_view('api.lugar.list',
                                db=db,
                                model_class=Lugar,
                                form_class=LugarForm))
app.add_url_rule(BASE_API_URL + 'lugar/<int:object_id>/',
                 view_func=BaseModelCrudView.as_view('api.lugar.instance',
                                db=db,
                                model_class=Lugar,
                                form_class=LugarForm))

app.add_url_rule(BASE_API_URL + 'user/',
                 view_func=BaseModelListCrudView.as_view('api.user.list',
                                db=db,
                                model_class=User,
                                form_class=UserForm))
app.add_url_rule(BASE_API_URL + 'user/<int:object_id>/',
                 view_func=BaseModelCrudView.as_view('api.user.instance',
                                db=db,
                                model_class=User,
                                form_class=UserForm))



@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static', 'images'),
                               'favicon.ico',
                               mimetype='image/vnd.microsoft.icon')
app.run()
