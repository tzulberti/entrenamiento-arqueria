# -*- coding: utf-8 -*-

from wtforms.fields import FloatField, DateField, IntegerField

from entrenamiento.views.form import ValidationForm
from entrenamiento.views.utils import get_logged_user_data

class PagoForm(ValidationForm):
    ''' Tiene toda la data del form de cuando se esta creando
    o editando un :class:`entrenamiento.models.user.User`

    '''

    cuando = DateField('cuando',
                       format='%d/%m/%Y')
    mes_correspondiente = DateField('mes_correspondiente',
                                    format='%d/%m/%Y')
    importe = FloatField('importe')
    id_razon_pago = IntegerField('id_razon_pago')

    def get_instance(self):
        res = super(PagoForm, self).get_instance()
        logged_user = get_logged_user_data()
        res.id_cargado_por = logged_user.id
        return res

