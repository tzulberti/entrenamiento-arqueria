/**
 * La applicacion que se encarga de todo el tema del CRUD
 * de lugares.
 */
var InvitacionCrudApplication = BaseTemplateCrudApp.$extend({

    __init__: function(historyManager, element) {
        var columnNames = [
            'email',
            'usada',
        ];
        this.$super(historyManager, 'invitacion', formTemplate, element, columnNames);
    }
});

