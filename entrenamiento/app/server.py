# -*- coding:utf -*-


from entrenamiento.app.app import app
from entrenamiento.views.lugares.crud import (LugarCrudTemplate,
                                              LugarListCrudView,
                                              LugarModelCrudView)


#: la url que forma parte de la base de las API Rest
BASE_API_URL = '/api/v01/'

app.add_url_rule('/lugar/',
                 view_func=LugarCrudTemplate.as_view('crud.lugar'))
app.add_url_rule(BASE_API_URL + 'lugar/',
                 view_func=LugarListCrudView.as_view('api.lugar.list'))
app.add_url_rule(BASE_API_URL + 'lugar/<int:object_id>/',
                 view_func=LugarModelCrudView.as_view('api.lugar.instance'))

app.run()
