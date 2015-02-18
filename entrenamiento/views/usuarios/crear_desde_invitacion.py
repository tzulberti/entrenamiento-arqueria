# -*- coding: utf-8 -*-

import os
from flask import render_template, redirect, url_for, request

from entrenamiento.utils import random_text
from entrenamiento.models.arquero import Arquero
from entrenamiento.models.invitacion import Invitacion
from entrenamiento.models.usuario import Usuario
from entrenamiento.views.base import BaseEntrenamientoView
from entrenamiento.views.usuarios.form import UserForm

class CrearUsuarioDesdeInvitacionView(BaseEntrenamientoView):

    def __init__(self, db, base_upload_folder):
        super(CrearUsuarioDesdeInvitacionView, self).__init__()
        self.upload_folder = os.path.join(base_upload_folder, 'user_images')
        self.db = db
        if not os.path.isdir(self.upload_folder):
            os.makedirs(self.upload_folder)

    def get(self, codigo_arquero, codigo_invitacion):
        return render_template('create_user_from_invitation.html',
                               codigo_arquero=codigo_arquero,
                               codigo_invitacion=codigo_invitacion,
                               form=UserForm(Usuario),
                               error_invitacion=False)

    def post(self, codigo_arquero, codigo_invitacion):
        ''' Se encarga de crear el usuario siempre y cuando el hash de la envitacion
        siga siendo valido..
        '''
        # primero me fijo que la invitacion exista y que la misma sea valida
        query_invitacion = Invitacion.query.filter(Invitacion.codigo == codigo_invitacion)
        invitacion = query_invitacion.first()
        form_usuario = UserForm(Usuario)
        if form_usuario.validate_on_submit() and invitacion and not invitacion.usada:
            invitacion.usada = True


            # el usuario tiene que estar relacionado al arquero en cuestion
            arquero = Arquero.query.filter(Arquero.codigo == codigo_arquero).first()
            arquero.nombre = form_usuario.nombre.data
            arquero.apellido = form_usuario.apellido.data
            arquero.email = form_usuario.email.data
            arquero.fecha_ingreso = form_usuario.fecha_ingreso.data
            arquero.fecha_nacimiento = form_usuario.fecha_nacimiento.data
            arquero.dni = form_usuario.dni.data
            arquero.telefono = form_usuario.telefono.data
            arquero.celular = form_usuario.celular.data
            arquero.direccion = form_usuario.direccion.data
            arquero.localidad = form_usuario.localidad.data
            arquero.codigo_postal = form_usuario.codigo_postal.data
            arquero.apodo_eda = form_usuario.apodo_eda.data
            arquero.latitud = form_usuario.latitud.data
            arquero.longitud = form_usuario.longitud.data

            if form_usuario.dominancia_ojo.data:
                arquero.id_dominancia_ojo = form_usuario.dominancia_ojo.data.id
            if form_usuario.dominancia_mano.data:
                arquero.id_dominancia_mano = form_usuario.dominancia_mano.data.id

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

            form_usuario.instance.id = arquero.id
            form_usuario.instance.id_arquero = arquero.id


            self.db.session.add(invitacion)
            self.db.session.add(arquero)
            self.db.session.add(form_usuario.instance)
            self.db.session.commit()
            return redirect(url_for('index'))
        else:
            return render_template('create_user_from_invitation.html',
                                   codigo_invitacion=codigo_invitacion,
                                   codigo_arquero=codigo_arquero,
                                   form=form_usuario,
                                   error_invitacion=(not invitacion or invitacion.usada))


