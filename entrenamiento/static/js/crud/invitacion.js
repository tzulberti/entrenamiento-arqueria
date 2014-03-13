/**
 * La applicacion que se encarga de todo el tema del CRUD
 * de lugares.
 */
var InvitacionCrudApplication = BaseTemplateCrudApp.$extend({

    __init__: function(historyManager, element) {
        var formTemplate = '' +
            '<form role="form" class="form-horizontal">' +
                '<div class="form-group">' +
                    '<label for="nombre" class="col-sm-2 control-label">Email</label>' +
                    '<div class="col-sm-10">' +
                        '<input type="text" name="email" id="email" class="form-control">' +
                        '<span class="help-block">El email de la persona a quien se le tiene que enviar la invitacion para que se cree un usuario</span>' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<div class="col-sm-10 col-sm-offset-2">' +
                        '<button type="submit" class="btn btn-primary button-save">Grabar</button>' +
                    '</div>' +
                '</div>' +
            '</form>';
        var columnNames = [
            'email',
            'usada',
        ];
        this.$super(historyManager, 'invitacion', formTemplate, element, columnNames);
    }
});

