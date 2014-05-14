/**
 * Se encarga de mostrar todos los filtros que esta viendo el usuario
 * aplicados sobre la tabla en cuestion.
 */
var FiltersView = Class.$extend({

    /**
     * Constructor.
     *
     * @param {jQuery} element: el elemento del DOM en donde es que se tiene
     *                          que mostrar toda la informacion de los filtros
     *                          existentes.
     *
     * @param {DatabaseInformation} databaseInformation: tiene la informacion
     *                          del schema de la base de datos.
     *
     * @param {FkInformation} fkInformation: tiene la informacion de las tablas
     *                                       referenciadas que no son constantes.
     */
    __init__: function(element, databaseInformation, fkInformation) {
        this.$element = element;
        this.databaseInformation = databaseInformation;
        this.fkInformation = fkInformation;

        this.template = $("#filters-view-handlebars-template").html();
    },

    /**
     * Se encarga de renderar en el dom todos los filtros aplicados.
     *
     * @param {Array(Filter)} filtros: una lista con todos los filtros aplicados
     *                                 por el usuario.
     */
    render: function(filters) {
        var html = Handlebars.render(this.template, {
                            filters: filters,
                            databaseInformation: this.databaseInformation,
                            fkInformation: this.fkInformation
        });
        this.$element.clean();
        this.$element.html(html);
    }
})
