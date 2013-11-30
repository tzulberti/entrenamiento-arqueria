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
     */
    __init__: function(element, modelName, columnNames) {
        this.$element = element;
        this.modelName = modelName;
        this.columnNames = columnNames;

        // no lo puedo recivir por el constructor,
        // por lo que lo tengo que recivir por aca...
        this.crudView = null;
        this.filters = [];
        this.orderBy = null;
        this.orderDirection = 'ASC';
        this.limit = 20;
        this.currentPage = 0;

        this.template = '' +
            '<div class="alert alert-success hidden" id="created-instance">' +
                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                'Se guardo la nueva informacion' +
            '</div>' +
            '<div class="alert alert-success hidden" id="updated-instance">' +
                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                'Se guardaron los cambios' +
            '</div>' +
            '<div class="alert alert-success hidden" id="deleted-instance">' +
                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                'Se borro la informacion' +
            '</div>' +
            '<div class="row">' +
                '<button type="button" class="btn btn-primary button-create">' +
                    '<span class=".glyphicon .glyphicon-plus">Crear uno nuevo</span>' +
                '</button>' +
            '</div>'  +
            '<div class="row search-conditions">' +
            '</div>' +
            '<div class="row" id="information-container">' +
                '<div class="row" id="table-information-container">'+
                '</div>'+
                '<div class="row" id="pagination-information-container">' +
                '</div>' +
            '</div>';

    },


    /**
     * Se encarga de mostrar la tabla con toda la informacion correspondiente.
     *
     * Esto se tiene que encargar de renderar tanto la parte de la tabla, como
     * la parte de las condiciones de filtrado que tiene el usuario.
     */
    render: function() {
        var baseHtml = Handlebars.render(this.template, {});
        this.$element.html(baseHtml);
        this.renderSearchConditions();
        this.getData();

        this.$element.off('click', '.button-create');
        this.$element.off('click', '.pagination-page');
        this.$element.off('click', '.button-edit');
        this.$element.off('click', '.button-delete');
        this.$element.off('click', '.column-name');

        this.$element.on('click', '.button-create', $.proxy(this.createNew, this));
        this.$element.on('click', '.pagination-page', $.proxy(this.changePage, this));
        this.$element.on('click', '.button-edit', $.proxy(this.editValue, this));
        this.$element.on('click', '.button-delete', $.proxy(this.deleteValue, this));
        this.$element.on('click', '.column-name', $.proxy(this.selectedOrderBy, this));
   },


    /**
     * Se encarga de mostrar todas las condiciones de filtrado por las que el usuario
     * puede ver toda la informacion.
     *
     * Por default no hace nada.
     */
    renderSearchConditions: function() {
    },

    /**
     * Se encarga de obtener la informacion del servidor teniendo en cuenta
     * todas las condiciones de filtrado y el tema del paginado.
     */
    getData: function() {
        var self = this;
        $.ajax({
            type: 'GET',
            url: '/api/v01/' + this.modelName + '/',
            data: {
                offset: this.currentPage * this.limit,
                limit: this.limit,
                orderBy: this.orderBy,
                orderDirection: this.orderDirection,
                filters: this.filters
            },
            success: function(data, textStatus, jqXHR) {
                self.renderInformation(data);
            }
        });
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
        var html = '';
        if (values.length === 0) {
            html = '<h2>No Information was found</h2>';
        } else {
            var template = '' +
                '<table class="table table-hover table-bordered table-striped">' +
                    '<thead>' +
                        '{{#each columnNames }}' +
                            '{{#ifCond this "!==" "id" }}' +
                                '<th>' +
                                    '{{renderColumnHeader this ../../orderBy ../../orderDirection }}' +
                                '</th>' +
                            '{{/ifCond}}' +
                        '{{/each}}' +
                        '<th>Edit</th>' +
                        '<th>Delete</th>' +
                    '</thead>' +
                    '<tbody>' +
                        '{{#each values}}' +
                            '<tr>' +
                                '{{renderTableRow this ../columnNames }}' +
                            '</tr>' +
                        '{{/each}}'
                    '</tbody>' +
                '</table>';
            html = Handlebars.render(template, {
                    columnNames: this.columnNames,
                    values: values,
                    orderDirection: this.orderDirection,
                    orderBy: this.orderBy
            });
        }
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

        this.crudView.createNew();
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
        this.crudView.editObject(objectId);
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
                self._hideMessages();
                self.$element.find('#deleted-instance').removeClass('hidden');
                self.getData();
            }
        })
    },


    /**
     * Handler llamado por el crudView cuando el usuario pudo crear
     * bien una nueva instancia del objeto que el mismo queria.
     */
    createdObject: function() {
        this._hideMessages();
        this.$element.find('#created-instance').removeClass('hidden');
        this.getData();
    },


    /**
     * Oculta todos los mensajes que se pueden leegar a estar mostrando
     * por default de cosa de evitar que dos mensajes que muestren al
     * mismo tiempo.
     *
     * Esto se refiere a los mensajes usados para mostrar que se pudo
     * guardar los cambios o que la instancia fue borrada correctamente.
     */
    _hideMessages: function() {
        this.$element.find('.alert').addClass('hidden');
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



})
