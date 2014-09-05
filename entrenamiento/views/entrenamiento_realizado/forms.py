# -*- coding: utf-8 -*-

from entrenamiento.views.form import ModelForm

class EntrenamientoRealizadoForm(ModelForm):
    ''' Tiene toda la data del form de cuando se esta creando
    o editando un :class:`entrenamiento.models.entrenamiento.EntrenamientoRealizado`

    '''

    def __init__(self, model_class, object_id=None):
        super(EntrenamientoRealizadoForm, self).__init__(model_class,
                                                        ['id_usuario'],
                                                        object_id)

class EntrenamientoFlechasForm(ModelForm):
    ''' Tiene toda la data del form de cuando se esta creando
    o editando un :class:`entrenamiento.models.entrenamiento.EntrenamientoFlechas`

    '''

    def __init__(self, model_class, object_id=None):
        super(EntrenamientoFlechasForm, self).__init__(model_class,
                                                       [],
                                                       object_id)

