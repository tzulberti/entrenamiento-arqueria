# -*- coding:utf -*-

import os
from flask import send_from_directory


from entrenamiento.app.app import app, db
from entrenamiento.app.singleton import mail_sender
from entrenamiento.models.invitacion import Invitacion
from entrenamiento.models.lugar import Lugar
from entrenamiento.models.usuario import Usuario
from entrenamiento.models.arco import Arco, ArcoRecurvado
from entrenamiento.models.pago import Pago
from entrenamiento.models.torneo import Torneo, Ronda, Serie

from entrenamiento.views.base import (BaseModelListCrudView,
                                      BaseModelCrudView)
from entrenamiento.views.auth.login import LoginView
from entrenamiento.views.auth.logout import LogoutView
from entrenamiento.views.arcos.form import ArcoRecurvadoForm
from entrenamiento.views.index import IndexViewTemplate
from entrenamiento.views.invitacion.crud import InvitacionListCrudView
from entrenamiento.views.invitacion.form import InvitacionForm
from entrenamiento.views.lugares.form import LugarForm
from entrenamiento.views.pago.form import PagoForm
from entrenamiento.views.torneo.forms import TorneoForm, RondaForm, SerieForm
from entrenamiento.views.upload import UploadFileView
from entrenamiento.views.usuarios.form import UserForm
from entrenamiento.views.usuarios.crear_desde_invitacion import CrearUsuarioDesdeInvitacionView


#: la url que forma parte de la base de las API Rest
BASE_API_URL = '/api/v01/'

def register_url(model_name, model_class, form_class,
                 list_crud_view_class=BaseModelListCrudView,
                 instance_crud_view_class=BaseModelCrudView,
                 list_crud_view_kwargs=dict(),
                 instance_crud_view_kwargs=dict()):

    app.add_url_rule(BASE_API_URL + model_name + '/',
                     view_func=list_crud_view_class.as_view('api.%s.list' % model_name,
                                                            db=db,
                                                            model_class=model_class,
                                                            form_class=form_class,
                                                            **list_crud_view_kwargs))
    app.add_url_rule(BASE_API_URL +  model_name + '/<int:object_id>/',
                     view_func=instance_crud_view_class.as_view('api.%s.instance' % model_name,
                                                                db=db,
                                                                model_class=model_class,
                                                                form_class=form_class,
                                                                **instance_crud_view_kwargs))


app.add_url_rule('/login/',
                 view_func=LoginView.as_view('auth.login'))
app.add_url_rule('/logout/',
                 view_func=LogoutView.as_view('auth.logout'))
app.add_url_rule('/',
                 view_func=IndexViewTemplate.as_view('index'))



app.add_url_rule(BASE_API_URL + 'invitacion/',
                 view_func=InvitacionListCrudView.as_view('api.invitacion.list',
                                                          mail_sender=mail_sender,
                                                          running_host=app.config['RUNNING_HOST'],
                                                          db=db,
                                                          model_class=Invitacion,
                                                          form_class=InvitacionForm))
app.add_url_rule(BASE_API_URL + 'invitacion/<int:object_id>/',
                 view_func=BaseModelCrudView.as_view('api.invitacion.instance',
                                                     db=db,
                                                     model_class=Invitacion,
                                                     form_class=InvitacionForm))

register_url('lugar', Lugar, LugarForm)
register_url('user', Usuario, UserForm)
# TODO en esta view solo se deberia permitir el tema de la lectura
# del GET
register_url('arco', Arco, ArcoRecurvadoForm)
register_url('arco-recurvado', ArcoRecurvado, ArcoRecurvadoForm)
register_url('torneo', Torneo, TorneoForm)
register_url('ronda', Ronda, RondaForm)
register_url('serie', Serie, SerieForm)
register_url('pago', Pago, PagoForm)

app.add_url_rule('/crear/usuario/invitacion/<hash_invitacion>/',
                 view_func=CrearUsuarioDesdeInvitacionView.as_view('auth.usuario.invitacion',
                                                                   db=db,
                                                                   base_upload_folder=app.config['UPLOAD_FOLDER']))

app.add_url_rule(BASE_API_URL + 'upload/foto-ronda/',
                 view_func=UploadFileView.as_view('api.upload.foto_ronda',
                                                  file_extensions=['bmp', 'jpg', 'gif', 'png', 'psd', 'jpeg', 'svg'],
                                                  upload_folder=app.config['UPLOAD_FOLDER']))

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static', 'images'),
                               'favicon.ico',
                               mimetype='image/vnd.microsoft.icon')

if __name__ == '__main__':
    app.run()
