/**
 * La applicacion que se encarga de todo el tema del CRUD
 * de lugares.
 */
var PagoCrudApplication = BaseTemplateCrudApp.$extend({

    __init__: function(historyManager, apiManager, element) {
        var formTemplate = $("#pago-form-handlebars-template").html();
        var columnNames = [
            'cuando',
            'importe',
            'razon_pago_id'
        ];
        this.$super(historyManager, apiManager, 'pago', formTemplate, element, columnNames);
    }
});

