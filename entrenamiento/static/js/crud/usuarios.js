/**
 * La applicacion que se encarga de todo el tema del CRUD
 * de usarios.
 */
var UsuariosCrudApplication = BaseTemplateCrudApp.$extend({

    __init__: function(historyManager, apiManager, element) {
        var formTemplate = '' +
            '<form role="form" class="form-horizontal">' +
                '<div class="form-group">' +
                    '<label for="email" class="col-sm-2 control-label">Email</label>' +
                    '<div class="col-sm-10">' +
                        '<input type="text" name="email" id="email" class="form-control">' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label for="nombre" class="col-sm-2 control-label">Nombre</label>' +
                    '<div class="col-sm-10">' +
                        '<input type="text" name="nombre" id="nombre" class="form-control">' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label for="apellido" class="col-sm-2 control-label">Apellido</label>' +
                    '<div class="col-sm-10">' +
                        '<input type="text" name="apellido" id="apellido" class="form-control">' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label for="password" class="col-sm-2 control-label">Password</label>' +
                    '<div class="col-sm-10">' +
                        '<input type="password" name="password" id="password" class="form-control">' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<div class="col-sm-10 col-sm-offset-2">' +
                        '<div class="checkbox">' +
                            '<label>' +
                                '<input type="checkbox" name="es_entrenador" id="es_entrenador">Es entrenador' +
                            '</label>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<div class="col-sm-10 col-sm-offset-2">' +
                        '<div class="checkbox">' +
                            '<label>' +
                                '<input type="checkbox" name="es_administrador" id="es_administrador">Es administrador' +
                            '</label>' +
                        '</div>' +
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
            'nombre',
            'apellido',
            'es_entrenador',
            'es_administrador'
        ];
        this.$super(historyManager, apiManager, 'user', formTemplate, element, columnNames);
    }
});


