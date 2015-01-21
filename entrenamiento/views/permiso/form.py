# -*- coding: utf-8 -*-

from entrenamiento.views.form import ModelForm

class PermisoUsuarioForm(ModelForm):

    def __init__(self, model_class, object_id=None):
        super(PermisoUsuarioForm, self).__init__(model_class,
                                                [],
                                                object_id)



