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

/**
 * Aplicacion base con todo lo que tiene que ver con el CRUD
 * (alta, baja y modificacion).
 */
var BaseCrudApp = BaseApp.$extend({

    __init__: function(historyManager, modelName, formTemplate, element, columnNames) {
        this.$super(historyManager);
        this.modelName = modelName;
        this.formTemplate = formTemplate;
        this.$element = element;
        this.columnNames = columnNames;
        this.historyManager.addApplicationForModel(modelName, this);
    },


    start: function() {
        this.tableView = new TableView(this.$element.find('.table-container'),
                                       this.modelName,
                                       this.columnNames);
        this.formView = new FormView(this.$element.find('.form-container'),
                                     this.formTemplate,
                                     this.modelName);
        this.crudView = new CrudView(this.tableView, this.formView, this.historyManager);
        this.tableView.crudView = this.crudView;
        this.formView.crudView = this.crudView;
        this.crudView.render();
    },


    /**
     * Se encarga de mostrar los cambios teniendo en cuenta lo que haya
     * hecho el usuario.
     *
     * Esto lo ejecuta el historyMandler para poder volver a lo que estaba
     * viendop antes el usuario.
     */
    handleHistoryChange: function(objectId) {
        if (objectId !== null) {
            this.crudView.editObject(objectId);
        } else {
            //this.crudView.
        }
    }


});
