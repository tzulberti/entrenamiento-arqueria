/**
 * La applicacion que se encarga de todo el tema del CRUD
 * de lugares.
 */
var PagoCrudApplication = BaseTemplateCrudApp.$extend({

    __init__: function(historyManager, element) {
        var formTemplate = $("#pago-form-handlebars-template").html();
        var columnNames = [
            'cuando',
            'importe',
            'razon'
        ];
        this.$super(historyManager, 'pago', formTemplate, element, columnNames);
    }
});

