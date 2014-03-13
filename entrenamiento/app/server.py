# -*- coding:utf -*-

import os
from flask import send_from_directory


from entrenamiento.app.app import app, db
from entrenamiento.app.singleton import mail_sender
from entrenamiento.models.invitacion import Invitacion
from entrenamiento.models.lugar import Lugar
from entrenamiento.models.user import Usuario
from entrenamiento.models.arco import Arco, ArcoRecurvado
from entrenamiento.models.torneo import Torneo, Ronda, Serie

from entrenamiento.views.base import (BaseModelListCrudView,
                                      BaseModelCrudView)
from entrenamiento.views.auth.auth import LoginView
from entrenamiento.views.auth.logout import LogoutView
from entrenamiento.views.auth.form import UserForm
from entrenamiento.views.arcos.form import ArcoRecurvadoForm
from entrenamiento.views.index import IndexViewTemplate
from entrenamiento.views.invitacion.crud import InvitacionListCrudView
from entrenamiento.views.invitacion.form import InvitacionForm
from entrenamiento.views.lugares.form import LugarForm
from entrenamiento.views.torneo.forms import TorneoForm, RondaForm, SerieForm
from entrenamiento.views.upload import UploadFileView


#: la url que forma parte de la base de las API Rest
BASE_API_URL = '/api/v01/'

app.add_url_rule('/login/',
                 view_func=LoginView.as_view('auth.login'))
app.add_url_rule('/logout/',
                 view_func=LogoutView.as_view('auth.logout'))
app.add_url_rule('/',
                 view_func=IndexViewTemplate.as_view('index'))


app.add_url_rule(BASE_API_URL + 'invitacion/',
                 view_func=InvitacionListCrudView.as_view('api.invitacion.list',
                                mail_sender=mail_sender,
                                db=db,
                                model_class=Invitacion,
                                form_class=InvitacionForm))
app.add_url_rule(BASE_API_URL + 'invitacion/<int:object_id>/',
                 view_func=BaseModelCrudView.as_view('api.invitacion.instance',
                                db=db,
                                model_class=Invitacion,
                                form_class=InvitacionForm))

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
                                model_class=Usuario,
                                form_class=UserForm))
app.add_url_rule(BASE_API_URL + 'user/<int:object_id>/',
                 view_func=BaseModelCrudView.as_view('api.user.instance',
                                db=db,
                                model_class=Usuario,
                                form_class=UserForm))

# TODO en esta view solo se deberia permitir el tema de la lectura
# del GET
app.add_url_rule(BASE_API_URL + 'arco/',
                 view_func=BaseModelListCrudView.as_view('api.arco.list',
                                db=db,
                                model_class=Arco,
                                form_class=ArcoRecurvadoForm))

app.add_url_rule(BASE_API_URL + 'arco-recurvado/',
                 view_func=BaseModelListCrudView.as_view('api.arco_recurvado.list',
                                db=db,
                                model_class=ArcoRecurvado,
                                form_class=ArcoRecurvadoForm))
app.add_url_rule(BASE_API_URL + 'arco-recurvado/<int:object_id>/',
                 view_func=BaseModelCrudView.as_view('api.arco_recurvado.instance',
                                db=db,
                                model_class=ArcoRecurvado,
                                form_class=ArcoRecurvadoForm))

app.add_url_rule(BASE_API_URL + 'torneo/',
                 view_func=BaseModelListCrudView.as_view('api.torneo.list',
                                db=db,
                                model_class=Torneo,
                                form_class=TorneoForm))

app.add_url_rule(BASE_API_URL + 'torneo/<int:object_id>/',
                 view_func=BaseModelCrudView.as_view('api.torneo.instance',
                                db=db,
                                model_class=Torneo,
                                form_class=TorneoForm))

app.add_url_rule(BASE_API_URL + 'ronda/',
                 view_func=BaseModelListCrudView.as_view('api.ronda.list',
                                db=db,
                                model_class=Ronda,
                                form_class=RondaForm))

app.add_url_rule(BASE_API_URL + 'ronda/<int:object_id>/',
                 view_func=BaseModelCrudView.as_view('api.ronda.instance',
                                db=db,
                                model_class=Ronda,
                                form_class=RondaForm))

app.add_url_rule(BASE_API_URL + 'serie/',
                 view_func=BaseModelListCrudView.as_view('api.serie.list',
                                db=db,
                                model_class=Serie,
                                form_class=SerieForm))

app.add_url_rule(BASE_API_URL + 'serie/<int:object_id>/',
                 view_func=BaseModelCrudView.as_view('api.serie.instance',
                                db=db,
                                model_class=Serie,
                                form_class=SerieForm))

app.add_url_rule(BASE_API_URL + 'upload/foto-ronda/',
                 view_func=UploadFileView.as_view('api.upload.foto_ronda',
                                                  file_extensions=['bmp', 'jpg', 'gif', 'png', 'psd', 'jpeg', 'svg'],
                                                  upload_folder='uploads/'))

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static', 'images'),
                               'favicon.ico',
                               mimetype='image/vnd.microsoft.icon')

if __name__ == '__main__':
    app.run()
