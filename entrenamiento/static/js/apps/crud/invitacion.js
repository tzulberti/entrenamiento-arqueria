/**
 * La applicacion que se encarga de todo el tema del CRUD
 * de Invitacion
 */
var InvitacionCrudApplication = FieldCrudApp.$extend({

    __init__: function(element, historyManager, apiManager, databaseInformation) {
        var formFields = [
            new FormFieldData('email', null)
        ];
        this.$super(element, historyManager, apiManager, databaseInformation,
                    'invitacion', ['email', 'usada'], formFields);
    }
});

