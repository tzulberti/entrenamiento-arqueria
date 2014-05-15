/**
 * La applicacion que se encarga de todo el tema del CRUD
 * de pagos
 */
var PagoCrudApplication = BaseTemplateCrudApp.$extend({

    __init__: function(element, historyManager, apiManager, databaseInformation,
                       tableName, tableColumns) {
        this.$super(element, historyManager, apiManager, databaseInformation,
                    'pago', []);
    }
});

