/**
 * La applicacion que se encarga de todo el tema del CRUD
 * de los Arqueros
 */
var TurnoCrudApplication = FieldCrudApp.$extend({

    __init__: function(element, historyManager, apiManager, databaseInformation) {
        var formFields = [
            new FormFieldData('id_lugar', null),
            new FormFieldData('id_dia_semana', null),
            new FormFieldData('horario_inicio', null),
            new FormFieldData('horario_fin', null)
        ];
        this.$super(element, historyManager, apiManager, databaseInformation,
                    'turno', ['id_lugar', 'id_dia_semana', 'horario_incio', 'horario_fin'], formFields);
    }
});

