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
        this.missingCallbacks = [];
        this.apiManager = apiManager;
        this.historyManager = historyManager;
        historyManager.addApplicationForModel(modelName, this);



        this.missingCallbacks = [];
    },

    start: function() {
        // antes que nada tengo que cargar toda la informacion de todas las columnas
        // que son FK a tablas que no son constantes.
        this.missingCallbacks = {};
        this.fkInformation = new FkInformation();
        var tableColumns = window.app.databaseInformation.getTableColumns(this.modelName);
        for (var i = 0; i < tableColumns.length; i++) {
            var columnInfo = tableColumns[i];
            if (columnInfo.foreignKey === null) {
                continue;
            }
            if (columnInfo.isConst()) {
                continue;
            }
            if (_.has(this.missingCallbacks, columnInfo.foreignKey)) {
                continue;
            }
            this.missingCallbacks[columnInfo.foreignKey] = true;
            this.apiManager.ajaxCallObject({
                url: columnInfo.foreignKey + '/',
                data: {
                    fkInformation: true
                },
                type: 'GET',
                successCallback: $.proxy(this.gotInformation, this, columnInfo.foreignKey)
            });
        }
    },

    gotInformation: function(modelName, response, textStatus, jqXHR) {
        console.log(modelName);
        this.missingCallbacks[modelName] = false;
        this.fkInformation.parseTableResponse(modelName, response.values);

        var missingData = _.values(this.missingCallbacks);
        var shouldContinue = true;
        for (var j = 0; j < missingData.length; j++) {
            if (missingData[j]) {
                shouldContinue = false;
                break;
            }
        }

        if (! shouldContinue) {
            return;
        }


        var tableView = new TableView(this.$element.find('.table-container'),
                                      this.modelName,
                                      this.columnNames,
                                      this.historyManager,
                                      this.apiManager,
                                      this.fkInformation);
        var formView = new TemplateFormView(this.$element.find('.form-container'),
                                            this.formTemplate,
                                            this.modelName);
        var crudView = new CrudView(tableView, formView, this.historyManager);
        tableView.crudView = crudView;
        formView.crudView = crudView;

        this.crudView = crudView;
        this.crudView.render();
    }


});
