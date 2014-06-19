/**
 *
 * El controller que se encarga de manejar toda la tabla
 * cruda cuando el usuario esta en la parte del CRUD.
 */
var TableController = Class.$extend({

    __init__: function(tableView, modelName, columnNames, historyManager, apiManager,
                       crudApp, searchController) {
        this.tableView = tableView;
        this.modelName = modelName;
        this.columnNames = columnNames;
        this.historyManager = historyManager;
        this.apiManager = apiManager;
        this.searchController = searchController;
        this.crudApp = crudApp;

        // si este valor es false, entonces el siguiente cambio que haga a la
        // tabla el usuario no se lo va a agregar al history
        this.addToHistory = true;

        this.orderBy = null;
        this.orderDirection = 'ASC';
        this.limit = 20;
        this.currentPage = 0;
    },

    render: function() {
        this.tableView.renderGettingInformation();

        if (this.addToHistory) {
            this.historyManager.pushNewTableStatus(this.modelName,
                                                   this.orderBy,
                                                   this.orderDirection,
                                                   this.currentPage);
        }

        // le tengo que volver a setear el valor en true para que el proximo
        // cambio que le haga, si lo agrugue al historial
        this.addToHistory = true;

        // tengo que traducir la information de los filtros
        var filtersData = utils.translateFiltersToAPI(this.searchController.filters);

        var ajaxData = {
                offset: this.currentPage * this.limit,
                limit: this.limit,
                orderBy: this.orderBy,
                orderDirection: this.orderDirection,
                filters: filtersData
        };

        this.apiManager.ajaxCall(this.modelName + '/',
                                 ajaxData,
                                 'GET',
                                 $.proxy(this.renderInformation, this)
        );
    },

    /**
     * Se encarga de mostrar toda la informacion que llego del servidor.
     *
     * La respuesta del servidor tiene el siguiente formato:
     *
     * {
     *      totalValues: X,
     *      filteredValues: Z,
     *      values: [
     *          [1, ...],
     *          [2, ...],
     *          ...
     *      ]
     * }
     *
     * donde:
     *
     *      totalValues: es la cantidad de valores totales que hay en la base
     *                   de datos sin tener en cuenta el tema de los filtros.
     *
     *      filterdValues: es la cantidad de valores que hay en la base
     *                     de datos teniendo en cuenta los filtros aplicados
     *                     por el usuario
     *
     *
     *      values: es un array de array, donde cada array representa una
     *              linea de valores que se encontro en la base de datos.
     */
    renderInformation: function(data) {
        this.tableView.renderInformation(this.columnNames,
                                         this.orderBy,
                                         this.orderDirection,
                                         data.values);

        this.tableView.renderPaginationInformation(data.totalCount,
                                                   data.filterCount,
                                                   this.limit,
                                                   this.currentPage);

        this.tableView.$element.find('.pagination-page').on('click', $.proxy(this.changePage, this));
        this.tableView.$element.find('.button-edit').on('click', $.proxy(this.editValue, this));
        this.tableView.$element.find('.button-delete').on('click', $.proxy(this.deleteValue, this));
        this.tableView.$element.find('.column-name').on('click', $.proxy(this.selectedOrderBy, this));
    },

    /**
     * Handler que se lo usa cuando el usuario quiere cambiar la pagina que el
     * mismo esta viendo.
     */
    changePage: function(ev) {
        ev.stopPropagation();
        ev.preventDefault();

        var target = $(ev.target);
        var selectedPage = target.text();
        selectedPage = parseInt(selectedPage, 10);
        this.currentPage = selectedPage - 1;
        this.render();
    },

    /**
     * Handler de cuando se hace click en el boton de editar de alguna
     * de las rows de la tabla.
     */
    editValue: function(ev) {
        ev.stopPropagation();
        ev.preventDefault();

        var target = $(ev.target);
        if (! target.hasClass('btn')) {
            target = target.parent();
        }
        var objectId = target.attr('id');
        objectId = objectId.replace('edit-', '');
        objectId = parseInt(objectId, 10);
        this.historyManager.pushNewInstanceStatus(this.modelName, objectId);
        this.crudApp.editObject(objectId);
    },

    /**
     * Handler de cuando el usuario hace click para borrar un valor de la
     * base de datos.
     */
    deleteValue: function(ev) {
        ev.stopPropagation();
        ev.preventDefault();

        var target = $(ev.target);
        if (! target.hasClass('btn')) {
            target = target.parent();
        }
        var objectId = target.attr('id');
        objectId = objectId.replace('delete-', '');
        objectId = parseInt(objectId, 10);


        var self = this;
        $.ajax({
            type: 'DELETE',
            url: '/api/v01/' + this.modelName + '/' + objectId + '/',
            success: function(data, textStatus, jqXHR) {
                new PNotify({
                    title: 'Delete',
                    text: 'Se borro la informacion',
                    delay: 1500,
                    type: 'success'
                });

                self.render();
            }
        })
    },

    /**
     * Handler de cuando el usuario hace click para ordenar los valores
     * de la tabla en funcion de una columna.
     */
    selectedOrderBy: function(ev) {
        ev.stopPropagation();
        ev.preventDefault();

        var target = $(ev.target);
        var columnName = target.attr('id');
        columnName = columnName.replace('column-', '');


        this.currenPage = 0;
        if (columnName === this.orderBy) {
            if (this.orderDirection === 'ASC') {
                this.orderDirection = 'DESC';
            } else {
                this.orderDirection = 'ASC';
            }
        } else {
            this.orderDirection = 'ASC';
            this.orderBy = columnName;
        }
        this.render();

    },

    /**
     * Handler llamado por el crudApp cuando el usuario pudo crear
     * bien una nueva instancia del objeto que el mismo queria.
     */
    createdObject: function() {
        new PNotify({
            title: 'Guardo la informacion',
            text: 'Se creo bien la nueva informacion',
            delay: 1500,
            type: 'success'
        });
        this.getData();
    }


});
