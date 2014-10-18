/**
 * La applicacion que se encarga de todo el tema del CRUD
 * de pagos
 */
var GastoCrudApplication = FieldCrudApp.$extend({

    __init__: function(element, historyManager, apiManager, databaseInformation) {
        var formFields = [
            new FormFieldData('cuando', null),
            new FormFieldData('mes_correspondiente', null),
            new FormFieldData('importe', null),
            new FormFieldData('id_razon_gasto', null),
            new FormFieldData('comentario', null)

        ];
        this.$super(element, historyManager, apiManager, databaseInformation,
                    'gasto', ['cuando', 'mes_correspondiente', 'importe'], formFields, null);
    }
});

