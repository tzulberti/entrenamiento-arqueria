# -* coding: utf-8 -*-

from datetime import date
from entrenamiento.views.form import ModelForm

class HistoriaEstadoArqueroForm(ModelForm):
    ''' Tiene toda la data del form de cuando se esta creando
    o editando un :class:`entrenamiento.models.historia_estado_arquero.HistoriaEstadoArquero`

    '''

    def __init__(self, model_class, object_id=None):
        super(HistoriaEstadoArqueroForm, self).__init__(model_class,
                                                        [],
                                                        object_id)

    def get_instance(self):
        res = super(HistoriaEstadoArqueroForm, self).get_instance()
        res.desde = date(res.desde.year,
                         res.desde.month,
                         1)
        if res.hasta:
            res.hasta = date(res.hasta.year,
                             res.hasta.month,
                             1)
        return res

