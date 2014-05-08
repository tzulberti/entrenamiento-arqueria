/**
 * Se encarga de todo lo que tiene que ver con la applicacion
 * que esta viendo el usuario.
 */
var BaseApp = Class.$extend({

    /**
     * Inicializa la instancia.
     *
     * @param {HistoryManager} historyManager: el que se encarga de
     *                                         manejar todo el tema
     *                                         del historial de la pagina.
     */
    __init__: function(historyManager) {
        this.historyManager = historyManager;
    }
});


var BaseCrudApp = BaseApp.$extend({

    __init__: function(historyManager, crudView) {
        this.$super(historyManager);
        this.crudView = crudView;
    },

    start: function() {
        this.crudView.render();
    },

    // Los metodos que figuran abajo son llamados por el history manager.
    //
    renderTableInformation: function(orderBy, orderDirection, currentPage) {
        this.crudView.renderTableInformation(orderBy, orderDirection, currentPage);
    },

    renderForm: function(objectId) {
        if (objectId === null) {
            this.crudView.createNew();
        } else {
            this.crudView.editObject(objectId);
        }
    }

});

/**
 * Aplicacion base con todo lo que tiene que ver con el CRUD
 * (alta, baja y modificacion).
 */
var BaseTemplateCrudApp = BaseCrudApp.$extend({

    __init__: function(historyManager, apiManager, modelName, formTemplate, element, columnNames) {
        this.modelName = modelName;
        this.formTemplate = formTemplate;
        this.$element = element;
        this.columnNames = columnNames;
        historyManager.addApplicationForModel(modelName, this);


        var tableView = new TableView(this.$element.find('.table-container'),
                                      this.modelName,
                                      this.columnNames,
                                      historyManager,
                                      apiManager);
        var formView = new TemplateFormView(this.$element.find('.form-container'),
                                             this.formTemplate,
                                             this.modelName);
        var crudView = new CrudView(tableView, formView, historyManager);
        tableView.crudView = crudView;
        formView.crudView = crudView;
        this.$super(historyManager, crudView);
    }

});
