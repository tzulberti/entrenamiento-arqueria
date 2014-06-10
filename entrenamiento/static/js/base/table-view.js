/**
 * Clase base que se usa para mostrar toda la informacion que existe en
 * la base de datos en forma de tabla.
 *
 * Para esto, la tabla tiene 3 partes:
 *
 * - La tabla en si, que muestra toda la informacion con el tema del
 *   paginado.
 *
 * - Una parte en la que se muestra toda la informacion de filtrado de
 *   la misma.
 *
 */
var TableView = Class.$extend({


    /**
     * Inicializa la instancia.
     *
     * @param {jQuery} element: el elemento del DOM en donde se tiene que
     *                          rendear toda la informacion.
     *
     * @param {string} modelName: el nombre del modelo que se va a mostrar
     *                            en la tabla. Esto se lo usa para hacer el
     *                            llamado Ajax correspondiente.
     *
     * @param {Array(string)} columnNames: todas las columnas que esta viendo
     *                                     el usuario.
     *
     * @param {Object} fkInformation: la informacion de las FK de la tabla
     *                                que no son constantes.
     *
     * @param {BaseCrudApp} crudApp: la applicacion que se encarga de
     *                               mostrar la tabla o el form segun
     *                               corresponda.
     */
    __init__: function(element, modelName, columnNames, historyManager,
                       apiManager, fkInformation, crudApp) {
        this.$element = element;
        this.modelName = modelName;
        this.columnNames = columnNames;
        this.historyManager = historyManager;
        this.apiManager = apiManager;
        this.fkInformation = fkInformation;
        this.crudApp = crudApp;

        // si este valor es false, entonces el siguiente cambio que haga a la
        // tabla el usuario no se lo va a agregar al history
        this.addToHistory = true;

        this.orderBy = null;
        this.orderDirection = 'ASC';
        this.limit = 20;
        this.currentPage = 0;

        this.template = $("#table-view-handlebars-template").html();
        this.tableContentTemplate = $("#table-content-view-handlebars-template").html();
    },


    /**
     * Se encarga de mostrar la tabla con toda la informacion correspondiente.
     *
     * Esto se tiene que encargar de renderar tanto la parte de la tabla, como
     * la parte de las condiciones de filtrado que tiene el usuario.
     */
    render: function() {
        var baseHtml = Handlebars.render(this.template, {});
        this.$element.clean();
        this.$element.html(baseHtml);

        this.searchController = new SearchController(this.$element.find('.search-conditions'),
                                                     window.app.databaseInformation,
                                                     this.modelName,
                                                     this.fkInformation,
                                                     this);
        this.searchController.render();

        this.getData();

        this.$element.find('#information-container').on('click', '.pagination-page', $.proxy(this.changePage, this));
        this.$element.find('#information-container').on('click', '.button-edit', $.proxy(this.editValue, this));
        this.$element.find('#information-container').on('click', '.button-delete', $.proxy(this.deleteValue, this));
        this.$element.find('#information-container').on('click', '.column-name', $.proxy(this.selectedOrderBy, this));
   },



    /**
     * Se encarga de obtener la informacion del servidor teniendo en cuenta
     * todas las condiciones de filtrado y el tema del paginado.
     */
    getData: function() {
        var self = this;
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
        var filtersQueryString = '';
        var filtersData = [];
        for (var i = 0; i < this.searchController.filters.length; i++) {
            var currentFilter = this.searchController.filters[i];
            filtersData.push(currentFilter.tableName + '|' + currentFilter.columnName + '|' + currentFilter.operator + '|' + currentFilter.value);
        }

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
        this.renderTableInformation(data.values);
        this.renderPaginationInformation(data.totalCount, data.filterCount);
    },


    /*
     * Se encarga de mostrar toda la informacion que se encontro en forma de tabla.
     *
     * @param {Array(Array(object))} values: los valores como fueron leidos de la base
     *                                       de datos.
     */
    renderTableInformation: function(values) {
        var html = Handlebars.render(this.tableContentTemplate, {
                columnNames: this.columnNames,
                values: values,
                orderDirection: this.orderDirection,
                orderBy: this.orderBy
        });
        this.$element.find('#table-information-container').html(html);

    },

    /**
     * Se encarga de renderar todo el tema de la paginacion de la
     * data.
     *
     * @param {int} totalCount: la informacion total que existen en la base
     *                          de datos cuando no se tiene en cuenta
     *                          los filtros aplicados.
     *
     * @param {int} filterCount: la canitdad totales de valores que existen
     *                           teniendo en cuenta los filtro usados.
     */
    renderPaginationInformation: function(totalCount, filterCount) {
        var previousPages = 0;
        var nextPages = 0;
        var maxNumberOfPages = filterCount / this.limit;
        if (filterCount === 0) {
            // en este caso no hay informacion porque la tabla no tiene
            // informacion o por los filtros que se aplicaron
            return
        }
        if (filterCount % this.limit === 0) {
            // en este caso le tengo que restar uno porque es justo cuando
            // es multiplo de la cantidad de paginas que se estan mostrando.
            maxNumberOfPages -= 1;
        }

        if (filterCount === 0) {
            // en este caso no se tiene que mostrar informacion de paginacion
            // porque no hay data teniendo en cuenta los filtros aplicados
            return ;
        }

        if (this.currentPage === 0) {
            // como estoy al principio de la pagina tengo que hacer
            // que se muestre las paginas siguientes.
            nextPages = 5;
        } else if (((this.currentPage + 1) * this.limit) == totalCount) {
            // en este caso estoy en la ultima pagina
            previousPages = 5;
        } else {
            previousPages = 2;
            nextPages = 3;
        }

        var html = '<ul class="pagination">';
        for (var i = 1; i < previousPages; i++) {
            if ((this.currentPage + 1 - i) < 1) {
                break;
            }

            html += '<li><a href="#" class="pagination-page">' + (this.currentPage + 1 - i) + '</a></li>';
        }
        html += '<li class="active"><a href="#">' + (this.currentPage + 1) + '</a></li>';
        for (var j = 1; j < nextPages; j++) {
            if (this.currentPage + j > maxNumberOfPages) {
                break;
            }
            html += '<li><a href="#" class="pagination-page">' + (this.currentPage + 1 + j) + '</a></li>';
        }

        html += '<ul>';
        this.$element.find('#pagination-information-container').html(html);
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
        this.getData();

    },

    /**
     * Handler de cuando el usuario hace click en el boton para agregar
     * un nuevo objecto.
     */
    createNew: function(ev) {
        ev.stopPropagation();
        ev.preventDefault();

        this.historyManager.pushNewInstanceStatus(this.modelName, null);
        this.crudApp.createNew();
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

                self.getData();
            }
        })
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
        this.getData();
    }

});
