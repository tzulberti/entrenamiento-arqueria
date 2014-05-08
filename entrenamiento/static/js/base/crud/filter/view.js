/**
 * La view que se encarga de renderar una de las condiciones por las que esta
 * filtrando el usuario.
 */
var FilterView = Class.$extend({

    /**
     * Constructor.
     *
     * @param {jQuery} element: el elemento del DOM en donde se tiene que mostrar
     *                          esta condicion.
     *
     * @param {DatabaseInformation} databaseInformation: el modelo que tiene toda
     *                          la informacion sobre el schema de la base de datos.
     */
    __init__: function(element, databaseInformation) {
        this.$element = element;
        this.databaseInformation = databaseInformation;

        this.template = $("#filter-view-handlebars-template").html();
    },

    /**
     * Se encarga de renderar la opcion de loading encima del filtro. Esto se
     * lo usa cuando se selecciona una columna que es una FK a otra tabla,
     * y se esta obteniendo la informacion de esta tabla.
     */
    renderLoading: function() {
        console.log('loading...');
    },

    /**
     * Se encarga de renderar la condicion de filtrado para
     * la tabla especificada.
     *
     * @param {String} tableName: el nombre de la tabla de la base de datos
     *                            para la cual se tiene que mostrar una
     *                            condicion de filtrado.
     *
     *
     * @param {String} columnName: el nombre de la tabla que se selecciono.
     *
     * @param {Integer} id: el identificador de este filtro.
     *
     */
    render: function(tableName, columnName, id) {
        var columnInformation = this.databaseInformation.getColumnInformation(tableName,
                                                                              columnName);
        var html = Handlebars.render(this.template, {
                        id: id,
                        columnsInformation: this.databaseInformation.getTableColumns(tableName),
                        constValues: columnInformation.constValues
        });
        this.$element.clean();
        this.$element.html(html);

        this.$element.find('.column-name').val(columnName);
    }


});
