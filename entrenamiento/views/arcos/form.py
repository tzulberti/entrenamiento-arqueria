# -*- coding: utf-8 -*-


from entrenamiento.views.form import ModelForm

class ArcoForm(ModelForm):
    ''' Tiene todas las columnas que corresponden tanto a los arcos
    recurvados como compuestos.
    '''

    def __init__(self, model_class, object_id=None):
        super(ArcoForm, self).__init__(model_class,
                                      ['tipo_arco', 'id_usuario'],
                                      object_id)



class ArcoRecurvadoForm(ArcoForm):

    def __init__(self, model_class, object_id=None):
        super(ArcoRecurvadoForm, self).__init__(model_class,
                                                object_id)

