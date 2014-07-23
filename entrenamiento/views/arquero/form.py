# -*- coding: utf-8 -*-

from entrenamiento.views.form import ModelForm

class ArqueroForm(ModelForm):
    ''' Tiene toda la data del form de cuando se esta creando
    o editando un :class:`entrenamiento.models.arquero.Arquero`

    '''

    def __init__(self, model_class, object_id=None):
        super(ArqueroForm, self).__init__(model_class,
                                          ['codigo'],
                                          object_id)

