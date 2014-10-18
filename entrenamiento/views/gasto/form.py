# -*- coding: utf-8 -*-

from datetime import date

from entrenamiento.views.form import ModelForm

class GastoForm(ModelForm):
    ''' Tiene toda la data del form de cuando se esta creando
    o editando un :class:`entrenamiento.models.gasto.Gasto`

    '''


    def __init__(self, model_class, object_id=None):
        super(GastoForm, self).__init__(model_class,
                                        [],
                                        object_id)

    def get_instance(self):
        res = super(GastoForm, self).get_instance()
        res.mes_correspondiente = date(res.mes_correspondiente.year,
                                       res.mes_correspondiente.month,
                                       1)
        return res

