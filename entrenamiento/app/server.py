# -*- coding:utf -*-


from entrenamiento.app.app import app
from entrenamiento.views.auth.auth import LoginView
from entrenamiento.views.index import IndexViewTemplate
from entrenamiento.views.lugares.crud import (LugarListCrudView,
                                              LugarModelCrudView)


#: la url que forma parte de la base de las API Rest
BASE_API_URL = '/api/v01/'

app.add_url_rule('/login/',
                 view_func=LoginView.as_view('auth.login'))
app.add_url_rule('/',
                 view_func=IndexViewTemplate.as_view('index'))
app.add_url_rule(BASE_API_URL + 'lugar/',
                 view_func=LugarListCrudView.as_view('api.lugar.list'))
app.add_url_rule(BASE_API_URL + 'lugar/<int:object_id>/',
                 view_func=LugarModelCrudView.as_view('api.lugar.instance'))

app.run()
