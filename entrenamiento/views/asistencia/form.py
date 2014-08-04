# -*- coding: utf-8 -*-

from entrenamiento.views.form import ModelForm

class AsistenciaForm(ModelForm):
    ''' Tiene toda la data del form de cuando se esta creando
    o editando un :class:`entrenamiento.models.asistencia.Asistencia`

    '''

    def __init__(self, model_class, object_id=None):
        super(AsistenciaForm, self).__init__(model_class,
                                             [],
                                             object_id)


