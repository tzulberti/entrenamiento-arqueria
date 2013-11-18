# -*- coding: utf-8 -*-


from entrenamiento.views.lugares.lugar import LugarView

def register(app, api_base_url):
    app.add_url(api_base_url + '/lugar/',
            LugarView.as_view('lugar'))

