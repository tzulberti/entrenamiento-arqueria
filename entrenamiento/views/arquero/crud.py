# -*- coding: utf-8 -*-

from flask import jsonify

from entrenamiento.utils import random_text
from entrenamiento.views.base import BaseModelListCrudView

class ArqueroListCrudView(BaseModelListCrudView):
    ''' Extiende la view para tener en cuenta que cuando se crea el
    arquero, se le tiene que setear un codigo al mismo.
    '''



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
                usuario_existente = query.first()
                if not usuario_existente:
                    break

            form.instance.codigo = codigo
            self.db.session.add(form.instance)
            self.db.session.commit()
            return jsonify(id=form.instance.id)
        else:
            return jsonify(form.errors), 400


