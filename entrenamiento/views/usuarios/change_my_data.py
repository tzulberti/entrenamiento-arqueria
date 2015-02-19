# -*- coding: utf-8 -*-

import os
from flask import render_template, redirect, url_for, request

from entrenamiento.utils import random_text
from entrenamiento.models.arquero import Arquero
from entrenamiento.views.base import UserRequiredView
from entrenamiento.views.usuarios.form import ArqueroForm
from entrenamiento.views.utils import get_logged_user_data


class ChangeMyDataView(UserRequiredView):

    def __init__(self, db, base_upload_folder):
        super(ChangeMyDataView, self).__init__()
        self.upload_folder = os.path.join(base_upload_folder, 'user_images')
        self.db = db
        if not os.path.isdir(self.upload_folder):
            os.makedirs(self.upload_folder)

    def get(self):
        return render_template('change_my_data.html',
                               form=ArqueroForm(Arquero))

    def post(self):
        ''' Se encarga de crear el usuario siempre y cuando el hash de la envitacion
        siga siendo valido..
        '''
        # primero me fijo que la invitacion exista y que la misma sea valida
        form_arquero = ArqueroForm(Arquero)
        if form_arquero.validate_on_submit():
            logged_user = get_logged_user_data()

            # el usuario tiene que estar relacionado al arquero en cuestion
            arquero = Arquero.query.filter(Arquero.id == logged_user.id_arquero).first()
            arquero.nombre = form_arquero.nombre.data
            arquero.apellido = form_arquero.apellido.data
            arquero.email = form_arquero.email.data
            arquero.fecha_ingreso = form_arquero.fecha_ingreso.data
            arquero.fecha_nacimiento = form_arquero.fecha_nacimiento.data
            arquero.dni = form_arquero.dni.data
            arquero.telefono = form_arquero.telefono.data
            arquero.celular = form_arquero.celular.data
            arquero.direccion = form_arquero.direccion.data
            arquero.localidad = form_arquero.localidad.data
            arquero.codigo_postal = form_arquero.codigo_postal.data
            arquero.apodo_eda = form_arquero.apodo_eda.data
            arquero.latitud = form_arquero.latitud.data
            arquero.longitud = form_arquero.longitud.data

            if form_arquero.dominancia_ojo.data:
                arquero.id_dominancia_ojo = form_arquero.dominancia_ojo.data.id
            if form_arquero.dominancia_mano.data:
                arquero.id_dominancia_mano = form_arquero.dominancia_mano.data.id

            if 'foto_archivo' in request.files:
                filename = None
                foto_stream = request.files['foto_archivo']
                extension = foto_stream.filename.rsplit('.', 1)[1]
                extension = extension.lower()

                while True:
                    filename = '%s.%s' % (random_text(), extension)
                    if not os.path.exists(os.path.join(self.upload_folder, filename)):
                        break
                foto_stream.save(os.path.join(self.upload_folder, filename))
                arquero.foto = filename

            self.db.session.add(arquero)
            self.db.session.commit()
            return redirect(url_for('auth.logout'))
        else:
            return render_template('change_my_data.html',
                                   form=form_arquero)


