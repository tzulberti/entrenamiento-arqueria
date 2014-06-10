# -*- coding: utf-8 -*-

from entrenamiento.views.form import ModelForm
from entrenamiento.views.utils import get_logged_user_data

class PagoForm(ModelForm):
    ''' Tiene toda la data del form de cuando se esta creando
    o editando un :class:`entrenamiento.models.user.User`

    '''


    def __init__(self, model_class, object_id=None):
        super(PagoForm, self).__init__(model_class,
                                        ['id_cargado_por'],
                                        object_id)

    def get_instance(self):
        res = super(PagoForm, self).get_instance()
        logged_user = get_logged_user_data()
        res.id_cargado_por = logged_user.id
        return res

