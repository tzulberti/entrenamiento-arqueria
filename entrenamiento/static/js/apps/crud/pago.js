
/**
 * La applicacion que se encarga de todo el tema del CRUD
 * de pagos
 */
var PagoCrudApplication = FieldCrudApp.$extend({

    __init__: function(element, historyManager, apiManager, databaseInformation) {
        var formFields = [
            new FormFieldData('id_usuario', null),
            new FormFieldData('cuando', null),
            new FormFieldData('mes_correspondiente', null),
            new FormFieldData('importe', null),
            new FormFieldData('id_razon_pago', null),
            new FormFieldData('comprobante_path', null),
            new FormFieldData('comentario', null)

        ];
        this.$super(element, historyManager, apiManager, databaseInformation,
                    'pago', ['cuando', 'importe'], formFields, 'upload/pago-comprobante/');
    }
});

