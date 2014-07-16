/**
 * La applicacion que se encarga de todo el tema del CRUD
 * de HistoriaEstadoArquero
 *
 *
 */
var HistoriaEstadoArqueroCrudApplication = FieldCrudApp.$extend({

    __init__: function(element, historyManager, apiManager, databaseInformation) {
        var formFields = [
            new FormFieldData('id_arquero', null),
            new FormFieldData('id_estado_arquero', null),
            new FormFieldData('desde', null),
            new FormFieldData('hasta', null)
        ];
        this.$super(element, historyManager, apiManager, databaseInformation,
                    'historia_estado_arquero',
                    ['id_arquero', 'id_estado_arquero', 'desde', 'hasta'],
                    formFields);
    }

});

