# -*- coding: utf-8 -*-


from entrenamiento.views.form import ModelForm

class InvitacionForm(ModelForm):
    ''' Tiene toda la data del form de cuando se esta creando
    o editando un :class:`entrenamiento.models.invitacion.Invitacion`

    '''

    def __init__(self, model_class, object_id=None):
        super(InvitacionForm, self).__init__(model_class,
                                             ['codigo', 'usada'],
                                             object_id)


