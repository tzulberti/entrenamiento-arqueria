# -*- coding: utf-8 -*-

from flask import jsonify, request

from entrenamiento.models.invitacion import Invitacion
from entrenamiento.utils import random_text
from entrenamiento.views.base import BaseModelListCrudView

class ArqueroListCrudView(BaseModelListCrudView):
    ''' Extiende la view para tener en cuenta que cuando se crea el
    arquero, se le tiene que setear un codigo al mismo.
    '''

    def __init__(self, mail_sender, running_host, **kwargs):
        super(ArqueroListCrudView, self).__init__(**kwargs)
        self.mail_sender = mail_sender
        self.running_host = running_host


    def post(self):
        form = self.form_class(self.model_class)
        if form.validate_on_submit():
            # le tengo que poner un codigo al usuario para poder identificarlo
            # sin tener que usar el id en la base de datos
            codigo = None
            while True:
                codigo = random_text(10)
                query = self.model_class.query
                query = query.filter(self.model_class.codigo == codigo)
                arquero_existente = query.first()
                if not arquero_existente:
                    break

            form.instance.codigo = codigo
            self.db.session.add(form.instance)
            self.db.session.commit()


            if 'mandar_invitacion' in request.form:
                invitacion = Invitacion(id_arquero=form.instance.id,
                                        codigo=random_text(10),
                                        usada=False)
                url = '%s/crear/usuario/invitacion/%s/%s/' % (self.running_host,
                                                            form.instance.codigo,
                                                            invitacion.codigo)


                self.mail_sender.send_mail([form.instance.email],
                                        'Invitacion al sistema de la EDA',
                                        url)

                self.db.session.add(invitacion)
                self.db.session.commit()


            return jsonify(id=form.instance.id)
        else:
            return jsonify(form.errors), 400


