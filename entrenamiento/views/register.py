# -*- coding: utf-8 -*-

from entrenamiento.views.lugares.lugares import TemplateLugarView
from entrenamiento.views.lugares.lugares import LugarView

def register(app, api_base_url):
    app.add_url_rule('/lugar/',
                     view_func=TemplateLugarView.as_view('template.lugar'))
    app.add_url_rule(api_base_url + '/lugar/',
                     view_func=LugarView.as_view('api.lugar'))

