# -*- coding: utf-8 -*-

from flask import jsonify

from entrenamiento.utils import random_text
from entrenamiento.views.base import BaseModelListCrudView

class InvitacionListCrudView(BaseModelListCrudView):
    ''' Extiende la view tener en cuenta de que cuando se crea una
    invitacion se tiene que enviar un email a la persona a quien se le creo
    la invitacion.

    '''

    def __init__(self, mail_sender, **kwargs):
        super(InvitacionListCrudView, self).__init__(**kwargs)
        self.mail_sender = mail_sender

    def post(self):
        form = self.form_class(self.model_class)
        if form.validate_on_submit():
            form.instance.codigo = random_text(10)
            form.instance.usada = False

            self.mail_sender.send_mail([form.instance.email],
                                       'Invitacion al sistema de la EDA',
                                       'http://localhost:5000/')

            self.db.session.add(form.instance)
            self.db.session.commit()
            return jsonify(id=form.instance.id)
        else:
            return jsonify(form.errors), 400


