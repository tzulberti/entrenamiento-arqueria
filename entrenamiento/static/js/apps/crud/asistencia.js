/**
 * La applicacion que se encarga de todo el tema del CRUD
 * de las asistencias de los alumnos a clase
 */
var AsistenciaCrudApplication = FieldCrudApp.$extend({

    __init__: function(element, historyManager, apiManager, databaseInformation) {
        var formFields = [
            new FormFieldData('id_arquero', null),
            new FormFieldData('id_turno', null),
            new FormFieldData('cuando', null),
        ];
        this.$super(element, historyManager, apiManager, databaseInformation,
                    'asistencia', ['cuando', 'id_arquero', 'id_turno'], formFields, null);
    }
});

