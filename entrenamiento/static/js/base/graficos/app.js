/**
 * La app basica para todo el tema de los graficos que puede llegar a ver el
 * usuario.
 */
var BaseGraficosApp = Class.$extend({

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
     */
    __init__: function(element, historyManager, apiManager,
                       databaseInformation, tableName, titulo) {
        this.$element = element;
        this.historyManager = historyManager;
        this.apiManager = apiManager;
        this.databaseInformation = databaseInformation;
        this.tableName = tableName;
        this.titulo = titulo;

        this.fkInformation = null;
        this.missingCallbacks = null;
        this.template = $("#graficos-view-handlebars-template").html();
    },

    /**
     * Se encarga de obtener toda la informacion de las FK de la
     * tabla que esta viendo el usario para despues renderar el view
     * correspondiente.
     */
    start: function() {
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
                successCallback: $.proxy(this.gotInformation, this, columnInfo.foreignKey)
            });
        }

        if (! hasFks) {
            // en el caso de que no tenga ninguan FK, entones
            // simplemente tengo que crear los controllers
            this.createControllers();
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
    gotInformation: function(modelName, response, textStatus, jqXHR) {
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

        this.createControllers();
    },

    /**
     * Se encarga de crear los controllers del form y del table
     * view para mostrarselos al usuario.
     */
    createControllers: function() {
        // rendero el template de basico en donde despues se va a renderar
        // la tabla y el form
        var html = Handlebars.render(this.template, {
                titulo: this.titulo
        });
        this.$element.clean();
        this.$element.html(html);

        this.searchController = this.createSearchController();
        this.chartController = this.createChartController();

        this.searchController.tableController = this.chartController;
        this.searchController.render();
        this.chartController.render();

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
    createChartController: function() {
        throw new Error('Este metodo se tiene que implementar');
    }

});
