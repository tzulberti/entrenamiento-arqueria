# -*- coding: utf-8 -*-

from datetime import date

from entrenamiento.views.form import ModelForm
from entrenamiento.views.utils import get_logged_user_data

class PagoForm(ModelForm):
    ''' Tiene toda la data del form de cuando se esta creando
    o editando un :class:`entrenamiento.models.pago.Pago`

    '''


    def __init__(self, model_class, object_id=None):
        super(PagoForm, self).__init__(model_class,
                                        ['id_cargado_por'],
                                        object_id)

    def get_instance(self):
        res = super(PagoForm, self).get_instance()
        logged_user = get_logged_user_data()
        res.id_cargado_por = logged_user.id
        res.mes_correspondiente = date(res.mes_correspondiente.year,
                                       res.mes_correspondiente.month,
                                       1)
        return res

