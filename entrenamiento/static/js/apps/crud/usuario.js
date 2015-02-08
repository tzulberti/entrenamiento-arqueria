/**
 * La applicacion que se encarga de todo el tema del CRUD
 * de los Arqueros
 */
var UsuarioCrudApplication = FieldCrudApp.$extend({

    __init__: function(element, historyManager, apiManager, databaseInformation) {
        var formFields = [
            new FormFieldData('id_arquero', null),
        ];
        this.$super(element,
                    historyManager,
                    apiManager,
                    databaseInformation,
                    'usuario',
                    ['arquero.nombre', 'arquero.apellido', 'arquero.email'],
                    formFields);
    }
});

