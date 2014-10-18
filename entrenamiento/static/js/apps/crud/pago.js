/**
 * La applicacion que se encarga de todo el tema del CRUD
 * de pagos
 */
var PagoCrudApplication = FieldCrudApp.$extend({

    __init__: function(element, historyManager, apiManager, databaseInformation) {
        var formFields = [
            new FormFieldData('id_arquero', null),
            new FormFieldData('cuando','Esto es cuando se hizo el pago'),
            new FormFieldData('mes_correspondiente', 'Esto es a que mes corresponde el mimso. Pone una fecha cualquiera de ese mes'),
            new FormFieldData('importe', null),
            new FormFieldData('id_razon_pago', null),
            new FormFieldData('comprobante_path', 'Si tenes una foto del comprobante del pago (o transferencia bancaria) la podes subir'),
            new FormFieldData('comentario', null)

        ];
        this.$super(element, historyManager, apiManager, databaseInformation,
                    'pago', ['cuando', 'id_arquero', 'importe'], formFields, 'upload/pago-comprobante/');
    }
});

