/**
 * La applicacion que se encarga de todo el tema del CRUD
 * de Invitacion
 */
var InvitacionCrudApplication = FieldCrudApp.$extend({

    __init__: function(element, historyManager, apiManager, databaseInformation) {
        var formFields = [
            new FormFieldData('id_arquero', null)
        ];
        this.$super(element, historyManager, apiManager, databaseInformation,
                    'invitacion', ['id_arquero', 'usada'], formFields);
    }
});

