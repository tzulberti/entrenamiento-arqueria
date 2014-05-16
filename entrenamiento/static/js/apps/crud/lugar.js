/**
 * La applicacion que se encarga de todo el tema del CRUD
 * de lugares.
 */
var LugarCrudApplication = FieldCrudApp.$extend({

    __init__: function(element, historyManager, apiManager, databaseInformation) {
        var formFields = [
            new FormFieldData('nombre', null),
            new FormFieldData('latitud', null),
            new FormFieldData('longitud', null),
            new FormFieldData('es_de_entrenamiento', null)
        ];
        this.$super(element, historyManager, apiManager, databaseInformation,
                    'lugar', ['nombre', 'latitud', 'longitud', 'es_de_entrenamiento'], formFields);
    }

});

