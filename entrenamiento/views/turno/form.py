# -*- coding: utf-8 -*-

from entrenamiento.views.form import ModelForm

class TurnoForm(ModelForm):
    ''' Tiene toda la data del form de cuando se esta creando
    o editando un :class:`entrenamiento.models.turno.Turno`

    '''

    def __init__(self, model_class, object_id=None):
        super(TurnoForm, self).__init__(model_class,
                                        [],
                                        object_id)

