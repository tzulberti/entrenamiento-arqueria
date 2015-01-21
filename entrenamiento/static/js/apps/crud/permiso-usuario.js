/**
 * La applicacion que se encarga de todo el tema del CRUD
 * de los permisos para los usuarios
 */
var PermisoUsuarioCrudApplication = FieldCrudApp.$extend({

    __init__: function(element, historyManager, apiManager, databaseInformation) {
        var formFields = [
            new FormFieldData('id_usuario', null),
            new FormFieldData('id_permiso', null),
        ];
        this.$super(element, historyManager, apiManager, databaseInformation,
                    'permiso_usuario', ['id_usuario', 'id_permiso'], formFields);
    }
});

