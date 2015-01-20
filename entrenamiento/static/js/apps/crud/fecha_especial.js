/**
 * La applicacion que se encarga de todo el tema del CRUD
 * de las fechas especiales
 */
var FechaEspecialCrudApplication = FieldCrudApp.$extend({

    __init__: function(element, historyManager, apiManager, databaseInformation) {
        var formFields = [
            new FormFieldData('cuando', null),
            new FormFieldData('id_tipo_dia_especial', null)
        ];
        this.$super(element, historyManager, apiManager, databaseInformation,
                    'fecha_especial', ['cuando', 'id_tipo_dia_especial'], formFields, null);
    }
});

