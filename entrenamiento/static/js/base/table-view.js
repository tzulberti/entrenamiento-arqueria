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
     */
    __init__: function(element, modelName) {
        this.$element = element;
        this.modelName = modelName;
        // no lo puedo recivir por el constructor,
        // por lo que lo tengo que recivir por aca...
        this.crudView = null;
        this.filters = [];
        this.orderBy = null;
        this.orderDirection = 'ASC'
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
        this.$element.on('click', '.button-create', $.proxy(this.createNew, this));
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
                offset: this.currentPage * 20,
                limit: 20,
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
     *      columnNames: [
     *          'foo',
     *          'bar',
     *          ...
     *      ]
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
     *      columnNames: es la lista de del nombre de las columnas que se van
     *                   a mostrar.
     *
     *      values: es un array de array, donde cada array representa una
     *              linea de valores que se encontro en la base de datos.
     */
    renderInformation: function(data) {
        this.renderTableInformation(data.values);
        this.renderPaginationInformation();

        this.$element.off('click', '.button-edit');
        this.$element.off('click', '.button-delete');

        this.$element.on('click', '.button-edit', $.proxy(this.editValue, this));
        this.$element.on('click', '.button-delete', $.proxy(this.deleteValue, this));
    },


    /*
     * Se encarga de mostrar toda la informacion que se encontro en forma de tabla.
     *
     * @param {Array(Array(object))} values: los valores como fueron leidos de la base
     *                                       de datos.
     */
    renderTableInformation: function(values) {
        if (values.length === 0) {
        } else {
            var value = values[0];
            var columnNames = [];
            for (var attr in value) {
                columnNames.push(attr);
            }
            var template = '' +
                '<table class="table table-hover table-bordered table-striped">' +
                    '<thead>' +
                        '{{#each columnNames }}' +
                            '{{#ifCond this "!==" "id" }}' +
                                '<th><a href="#" class="column-name">{{readableName this }}</a></th>' +
                            '{{/ifCond}}' +
                        '{{/each}}' +
                        '<th>Edit</th>' +
                        '<th>Delete</th>' +
                    '</thead>' +
                    '<tbody>' +
                        '{{#each values}}' +
                            '<tr>' +
                                '{{#each this }}' +
                                    '{{#ifCond @key "!==" "id" }}' +
                                        '<td>{{ this }}</td>' +
                                    '{{/ifCond}}' +
                                '{{/each}}' +
                                '<td>'+
                                    '<button type="button" class="btn btn-success btn-sm button-edit" id="edit-{{ this.id }}">' +
                                        '<span class="glyphicon glyphicon-edit"></span>' +
                                    '</button>' +
                                '</td>'+
                                '<td>' +
                                    '<button type="button" class="btn btn-danger btn-sm button-delete" id="edit-{{ this.delete }}">' +
                                        '<span class="glyphicon glyphicon-remove"></span>' +
                                    '</button>' +
                                '</td>' +
                            '</tr>' +
                        '{{/each}}'
                    '</tbody>' +
                '</table>';
            var html = Handlebars.render(template, {
                    columnNames: columnNames,
                    values: values
            });
            this.$element.find('#information-container').html(html);
        }
    },

    /**
     * Se encarga de renderar todo el tema de la paginacion de la
     * data.
     */
    renderPaginationInformation: function() {
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

        var target = $(ev.target).parent('button');
        var objectId = target.attr('id');
        console.log(objectId);
        objectId = objectId.replace('edit-', '');
        objectId = parseInt(objectId, 10);
        this.crudView.editObject(objectId);
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
    }





})
