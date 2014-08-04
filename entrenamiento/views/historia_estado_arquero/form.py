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

    def validate(self):
        ''' Se encarga de hacer las diferentes validaciones teniendo en cuenta
        los diferentes significados del estado.
        '''
        res = super(HistoriaEstadoArqueroForm, self).validate()
        if not res:
            return False

        # ahora tengo que hacer diferentes validaciones teniendo
        # en cuenta el estado del arquero
        if self.instance.id_estado_arquero == 1:
            # en este caso la fecha desde y hasta tienen que tener
            # los mismos valores
            if self.instance.desde != self.instance.hasta:
                self.errors['desde'] = 'Cuando se pone que sea la primer clase '\
                                    'entonces el desde y hasta tiene que ser '\
                                    'la misma fecha'
                return False
            # en este caso, esta asociado con la primer clase de la
            # persona. Por lo tanto, no puede haber otro estado que
            # sea antes del mismo
            query = self.model_class.query
            query = query.filter(self.model_class.id_arquero == self.instance.id_arquero)
            query = query.filter(self.model_class.desde < self.instance.desde)
            if query.first():
                # si hay algun valor, entonces significa que tiene otro
                # estado antes de haber ido a la primer clase lo que no
                # se puede llegar a dar
                self.errors['id_estado_arquero'] = ['El arquero ya tiene un '\
                                    'estado antes de haber ido a la primer '\
                                    'clase. Esto no se puede dar']
                return False

            query = self.model_class.query
            query = query.filter(self.model_class.id_arquero == self.instance.id_arquero)
            query = query.filter(self.model_class.id_estado_arquero == 1)
            if query.first():
                # si hay algun estado de primer clase entonces algo no
                # esta bien, porque este usuario ya tenia una primer
                # clase antes
                self.errors['id_estado_arquero'] = ['El arquero ya tiene anotada '\
                                    'una primer clase antes']
                return False

        elif self.instance.id_estado_arquero in (2, 3, 4):
            # en este caso, el arquero paso a otra modalidad. Por lo que no
            # se puede dar que en el mes el mismo tenga dos estados diferentes.
            query = self.model_class.query
            query = query.filter(self.model_class.id_arquero == self.instance.id_arquero)
            query = query.filter(self.model_class.id_estado_arquero > 1)
            query = query.filter(((self.model_class.hasta is None) & (self.model_class.desde > self.instance.desde)) |
                                 ((self.model_class.hasta is not None) & (self.model_class.hasta > self.instance.desde)))
            if query.first():
                self.errors['desde'] = 'Existe un estado para este arquero que '\
                                       'esta entre los valores dados de fechas'
                return False

        else:
            raise Exception('Estoy tratando con un ID que no es el que yo me esperaba')




