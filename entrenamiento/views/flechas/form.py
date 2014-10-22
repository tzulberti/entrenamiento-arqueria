# -*- coding: utf-8 -*-

from entrenamiento.views.form import ModelForm

class FlechasForm(ModelForm):
    ''' Tiene toda la data del form de cuando se esta creando
    o editando un :class:`entrenamiento.models.flechas.Flechas`

    '''


    def __init__(self, model_class, object_id=None):
        super(FlechasForm, self).__init__(model_class,
                                          ['id_usuario'],
                                          object_id)

