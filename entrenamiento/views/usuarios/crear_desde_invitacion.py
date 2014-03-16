# -*- coding: utf-8 -*-

from flask import render_template, redirect, url_for

from entrenamiento.models.invitacion import Invitacion
from entrenamiento.models.usuario import Usuario
from entrenamiento.views.base import BaseEntrenamientoView
from entrenamiento.views.usuarios.form import UserForm

class CrearUsuarioDesdeInvitacionView(BaseEntrenamientoView):

    def __init__(self, db):
        super(CrearUsuarioDesdeInvitacionView, self).__init__()
        self.db = db

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
            self.db.session.add(invitacion)
            self.db.session.add(form_usuario.instance)
            self.db.session.commit()
            return redirect(url_for('index'))
        else:
            return render_template('create_user_from_invitation.html',
                                   hash_invitacion=hash_invitacion,
                                   form=form_usuario,
                                   error_invitacion=(not invitacion or invitacion.usada))


