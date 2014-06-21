/**
 * La applicacion que se encarga de todo el tema del CRUD
 * de los Arqueros
 */
var ArqueroCrudApplication = FieldCrudApp.$extend({

    __init__: function(element, historyManager, apiManager, databaseInformation) {
        var formFields = [
            new FormFieldData('nombre', null),
            new FormFieldData('apellido', null),
            new FormFieldData('email', null)
        ];
        this.$super(element, historyManager, apiManager, databaseInformation,
                    'arquero', ['nombre', 'apellido', 'email'], formFields);
    }
});

