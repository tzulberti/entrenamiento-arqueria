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
        this.filters = [];
        this.orderBy = null;
        this.orderDirection = 'ASC'
        this.currentPage = 0;
    },


    /**
     * Se encarga de mostrar la tabla con toda la informacion correspondiente.
     *
     * Esto se tiene que encargar de renderar tanto la parte de la tabla, como
     * la parte de las condiciones de filtrado que tiene el usuario.
     */
    render: function() {
        this.renderSearchConditions();
        this.getData();
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
                console.log('Entro aca...');
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
            this.$element.html(html);
        }
    },

    /**
     * Se encarga de renderar todo el tema de la paginacion de la
     * data.
     */
    renderPaginationInformation: function() {
    }
})
