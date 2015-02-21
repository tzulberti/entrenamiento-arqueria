/**
 * La applicacion que se encarga de todo el tema del CRUD
 * de los Arqueros
 */
var ArqueroCrudApplication = FieldCrudApp.$extend({

    __init__: function(element, historyManager, apiManager, databaseInformation) {
        var formFields = [
            new FormFieldData('nombre', null),
            new FormFieldData('apellido', null),
            new FormFieldData('email', null),
            new FormInputData('mandar_invitacion', 'checkbox', 'Mandarle una invitacion al sistema cuando se crea el usuario'),
            new FormFieldData('fecha_ingreso', null),
            new FormFieldData('fecha_abandono', null),
            new FormFieldData('fecha_nacimiento', null),
            new FormFieldData('telefono', null),
            new FormFieldData('celular', null),
            new FormFieldData('direccion', null),
            new FormFieldData('localidad', null),
            new FormFieldData('codigo_postal', null),
            new FormFieldData('dni', null),
            new FormFieldData('apodo_eda', null),
            new FormFieldData('id_dominancia_ojo', null),
            new FormFieldData('id_dominancia_mano', null)
        ];
        this.$super(element, historyManager, apiManager, databaseInformation,
                    'arquero', ['nombre', 'apellido', 'email'], formFields);
    }
});

