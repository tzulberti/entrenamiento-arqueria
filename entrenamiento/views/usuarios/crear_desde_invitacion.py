# -*- coding: utf-8 -*-

import os
from flask import render_template, redirect, url_for, request

from entrenamiento.utils import random_text
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

    def get(self, hash_invitacion):
        return render_template('create_user_from_invitation.html',
                               hash_invitacion=hash_invitacion,
                               form=UserForm(Usuario),
                               error_invitacion=False)

    def post(self, hash_invitacion):
        ''' Se encarga de crear el usuario siempre y cuando el hash de la envitacion
        siga siendo valido..
        '''
        # primero me fijo que la invitacion exista y que la misma sea valida
        query_invitacion = Invitacion.query.filter(Invitacion.codigo == hash_invitacion)
        invitacion = query_invitacion.first()
        form_usuario = UserForm(Usuario)
        if form_usuario.validate_on_submit() and invitacion and not invitacion.usada:
            invitacion.usada = True

            if 'foto_archivo' in request.files:
                filename = None
                foto_stream = request.files['foto_archivo']
                if foto_stream.content_length:
                    extension = foto_stream.filename.rsplit('.', 1)[1]
                    extension = extension.lower()

                    while True:
                        filename = '%s.%s' % (random_text(), extension)
                        if not os.path.exists(os.path.join(self.upload_folder, filename)):
                            break
                    form_usuario.instance.foto = filename
                    foto_stream.save(os.path.join(self.upload_folder, filename))



            self.db.session.add(invitacion)
            self.db.session.add(form_usuario.instance)
            self.db.session.commit()
            return redirect(url_for('index'))
        else:
            return render_template('create_user_from_invitation.html',
                                   hash_invitacion=hash_invitacion,
                                   form=form_usuario,
                                   error_invitacion=(not invitacion or invitacion.usada))


