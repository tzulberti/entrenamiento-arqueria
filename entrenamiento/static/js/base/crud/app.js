/**
 * Controller que es usado para simplemente renderar toda
 * la informacion teniendo en cuenta el listado de las columnas
 * y las views asociadas.
 */
var BaseCrudApp = Class.$extend({

    /**
     * Constructor.
     *
     * @param {jQuery} element: el elemento del DOM en donde es que se tiene
     *                          que mostrar la tabla y el form.
     *
     * @param {HistoryManager} historyManager: el manager en donde se tiene que
     *                                         se va a encargar de tener en cuenta
     *                                         cuando el usuario cambia de opcion.
     *
     * @param {APIManager} apiManager: el manager que se va a usar para obtener la
     *                                 informacion de las FK de las tablas.
     *
     * @param {DatabaseInformation} databaseInformation: tiene toda la informacion
     *                                  del schema de la base de datos.
     *
     * @param {String} tableName: el nombre de la tabla que esta viendo el usuario
     *                            actualmente.
     *
     * @param {Array(String)} tableColumns: una lista de las columnas que se tienen
     *                              que mostrar en la view de columnas.
     */
    __init__: function(element, historyManager, apiManager, databaseInformation,
                       tableName, tableColumns) {
        this.$element = element;
        this.historyManager = historyManager;
        this.apiManager = apiManager;
        this.databaseInformation = databaseInformation;
        this.tableName = tableName;
        this.tableColumns = tableColumns;

        this.fkInformation = null;
        this.missingCallbacks = null;
        this.template = $("#crud-view-handlebars-template").html();
    },

    /**
     * Se encarga de obtener toda la informacion de las FK de la
     * tabla que esta viendo el usario para despues renderar el view
     * correspondiente.
     *
     * @param {Function} callback: la funcion que se tiene que llamar una vez
     *                             que se terminaron de crear todos los controllers
     */
    start: function(callback) {
        // antes que nada tengo que cargar toda la informacion de todas las columnas
        // que son FK a tablas que no son constantes.
        this.missingCallbacks = {};
        this.fkInformation = new FkInformation();
        var tableColumns = this.databaseInformation.getTableColumns(this.tableName);
        var hasFks = false;
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

            hasFks = true;
            this.missingCallbacks[columnInfo.foreignKey] = true;
            this.apiManager.ajaxCallObject({
                url: columnInfo.foreignKey + '/',
                data: {
                    fkInformation: true
                },
                type: 'GET',
                successCallback: $.proxy(this.gotInformation, this, columnInfo.foreignKey, callback)
            });
        }

        if (! hasFks) {
            // en el caso de que no tenga ninguan FK, entones
            // simplemente tengo que crear los controllers
            this.createControllers(callback);
        }
    },

    /**
     * Handler de obtener la informacion de una de las tablas
     * referenciadas por la tabla que esta viendo el usuario.
     *
     * @param {String} modelName: el nombre de la tabla de la cual se
     *                            obtuvo la informacion.
     *
     * @param {Object} response: la respuesta del servidor por la cual
     *                           puede filtrar el usuario.
     *
     *
     */
    gotInformation: function(modelName, callback, response, textStatus, jqXHR) {
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


        this.createControllers(callback);
    },

    /**
     * Se encarga de crear los controllers del form y del table
     * view para mostrarselos al usuario.
     *
     * @param {Functon} callback: la funcion que se tiene que ejecutar una vez que se
     *                            termino de crear todos los controllers
     */
    createControllers: function(callback) {
        // rendero el template de basico en donde despues se va a renderar
        // la tabla y el form
        var html = Handlebars.render(this.template, {
                tableName: this.tableName
        });
        this.$element.clean();
        this.$element.html(html);

        this.$element.find('.button-create').on('click', $.proxy(this.createNew, this));

        this.searchController = this.createSearchController();
        this.tableController = this.createTableController();
        this.formController = this.createFormController();

        // esto es por si antes venia de ver algun crud, entonces
        // tengo que ocultar el form anterior y poner en nuevo
        this.formController.formView.$element.hide();
        this.tableController.tableView.$element.show();

        this.searchController.tableController = this.tableController;
        if (! (_.isUndefined(callback) || _.isNull(callback))) {
            this.tableController.addToHistory = false;
        }
        this.tableController.render();
        this.searchController.render();

        if (! (_.isUndefined(callback) || _.isNull(callback))) {
            callback()
        }
    },

    /**
     * Se encarga de generar el controller que permite filtrar los valores
     * de la tabla
     */
    createSearchController: function() {
        var searchController = new SearchController(this.$element.find('.search-conditions'),
                                                     this.databaseInformation,
                                                     this.tableName,
                                                     this.fkInformation,
                                                     null);
        return searchController;
    },

    /**
     * Se encarga de crear la instancia del {TableView} que se va a
     * encargar de mostrar toda la informacion.
     */
    createTableController: function() {
        var tableView = new TableView(this.$element.find('#information-container'),
                                      this.databaseInformation.getTableColumns(this.tableName),
                                      this.fkInformation);
        var tableController = new TableController(tableView,
                                                  this.tableName,
                                                  this.tableColumns,
                                                  this.historyManager,
                                                  this.apiManager,
                                                  this,
                                                  this.searchController);
        return tableController;
    },

    /**
     * Se encarga de crear el form view/controller que se va a usar
     * para crear / editar valores
     *
     * A diferencia del {createTableView}, este es un metodo abstracto
     * por lo que las diferentes opciones se tienen que encargar de
     * implementarlo.
     */
    createFormController: function() {
        throw new Error('Se tiene que implementar este metodo');
    },



    /**
     * Se encarga de mostrar la tabla con toda la informacion
     */
    showTable: function() {
        this.$element.find('.table-container').show();
        this.$element.find('.form-container').hide();
        this.$element.find('.button-create').show();

        this.tableController.render();
    },

    /**
     * Handler de cuando el usuario hace click en el boton para agregar
     * un nuevo objecto.
     */
    createNew: function(ev) {
        if (ev !== null) {
            ev.stopPropagation();
            ev.preventDefault();
        }

        this.historyManager.pushNewInstanceStatus(this.tableName, null);
        this.$element.find('.table-container').hide();
        this.$element.find('.form-container').show();
        this.$element.find('.button-create').hide();
        this.formController.render(null);

    },

    /**
     * Handler de cuando el objeto se creo bien.
     *
     * @param {int} objectId: el id del objeto que fue recien creado.
     */
    createdObject: function(objectId) {
        this.$element.find('.table-container').show();
        this.$element.find('.form-container').hide();
        this.$element.find('.button-create').show();
        this.tableController.createdObject();
    },

    /**
     * Esto es llamado por el table view para que se muestre el
     * form para poder editar el objecto con el id indicado.
     *
     * @param {int} objectId: el id del objeto que se quiere editar.
     */
    editObject: function(objectId) {
        this.$element.find('.table-container').hide();
        this.$element.find('.form-container').show();
        this.$element.find('.button-create').hide();
        this.formController.render(objectId);
    },


    /**
     * Llamado desde el history manager cuando se vuelve para atras.
     *
     * Esta funcion solo se la usa cuando el usuario esta cambiando la parte
     * del historial (haciendo Back o Forward), asique es importante tener
     * en cuenta eso.
     */
    renderTableInformation: function(orderBy, orderDirection, currentPage) {
        this.tableController.orderBy = orderBy;
        this.tableController.orderDirection = orderDirection;
        this.tableController.currentPage = currentPage;

        this.tableController.addToHistory = false;

        // necesito llamar al render para que cambie todo el tema
        // de los eventos.
        this.showTable();
    }

});

/**
 * App para la parte del crud en donde el form se crea basandose
 * en los campos especificados de cada uno.
 */
var FieldCrudApp = BaseCrudApp.$extend({

    /**
     * Constrcutor.
     *
     * @param {Array(FormFieldData)} formFieldsData: la informacion de todas las
     *                                               columnas que se tienen que
     *                                               renderar en el form.
     *
     * @param {String} urlPekeUpload: en caso de que el form tenga un archivo que
     *                                el usuario tiene que subir, entonces este es el
     *                                path en donde se encuentra el archivo en cuestion.
     *                                Sino tiene el path de ningun archivo entonces va
     *                                a ser null
     */
    __init__: function(element, historyManager, apiManager, databaseInformation,
                       tableName, tableColumns, formFieldsData, urlPekeUpload) {
        this.$super(element, historyManager, apiManager, databaseInformation,
                    tableName, tableColumns);
        this.formFieldsData = formFieldsData;
        this.urlPekeUpload = urlPekeUpload;
    },

    /**
     * Crea una instancia de {FieldFormView} basandose en las columnas
     * especificadas.
     */
    createFormController: function() {
        var view = new FieldFormView(this.$element.find('.form-container'),
                                     this.databaseInformation.getTableColumns(this.tableName),
                                     this.fkInformation,
                                     this.formFieldsData);
        var controller = new FormController(view,
                                            this.apiManager,
                                            this.tableName,
                                            this.urlPekeUpload,
                                            this);
        return controller;

    }
})
