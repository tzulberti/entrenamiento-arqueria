# -*- coding: utf-8 -*-

from flask import jsonify

from entrenamiento.models.arquero import Arquero
from entrenamiento.utils import random_text
from entrenamiento.views.base import BaseModelListCrudView

class InvitacionListCrudView(BaseModelListCrudView):
    ''' Extiende la view tener en cuenta de que cuando se crea una
    invitacion se tiene que enviar un email a la persona a quien se le creo
    la invitacion.


    :param mail_sender: la instancia del que se va a encargar de mandar el mail.

    :param str running_host: la direccion HTTP en donde esta corriendo la aplicacion.
    '''

    def __init__(self, mail_sender, running_host, **kwargs):
        super(InvitacionListCrudView, self).__init__(**kwargs)
        self.mail_sender = mail_sender
        self.running_host = running_host

    def post(self):
        form = self.form_class(self.model_class)
        if form.validate_on_submit():
            form.instance.codigo = random_text(10)
            form.instance.usada = False


            arquero = Arquero.query.filter(Arquero.id == form.instance.id_arquero).first()
            url = '%s/crear/usuario/invitacion/%s/%s/' % (self.running_host,
                                                         arquero.codigo,
                                                         form.instance.codigo)


            self.mail_sender.send_mail([arquero.email],
                                       'Invitacion al sistema de la EDA',
                                       url)

            self.db.session.add(form.instance)
            self.db.session.commit()
            return jsonify(id=form.instance.id)
        else:
            return jsonify(form.errors), 400


