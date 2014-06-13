/**
 * El controller que permite al usuario filtrar cuando el mismo esta
 * viendo data cruda en forma de tabla en la parte de ABMs de la aplicacion
 */
var SearchController = Class.$extend({

    /**
     * Constructor
     *
     * @param {jQuery} element: el elemento del DOM en donde es que se tiene
     *                          que renderar toda la opcion de aplicar el filtro,
     *                          y ademas todos los filtros que existen.
     *
     *
     * @param {DatabaseInformation} databaseInformation: tiene toda la informacion sobre
     *                                                   el schema de la base de datos.
     *
     * @param {String} tableName: el nombre de la tabla por la cual el usuario puede
     *                            filtrar.
     *
     * @param {FkInformation} fkInformation: tiene toda la informacion de los valores
     *                                       referenciados por la tabla que no son
     *                                       constantes.
     *
     * @param {TableController} tableController: la view que se encarga de mostrar
     *                                           toda la informacion en forma de tabla
     *
     */
    __init__: function(element, databaseInformation, tableName, fkInformation, tableController) {
        this.$element = element;
        this.databaseInformation = databaseInformation;
        this.tableName = tableName;
        this.fkInformation = fkInformation;
        this.tableController = tableController;

        this.filters = [];
    },

    render: function() {
        var existingFiltersView = new FiltersView(this.$element.find('.existing-filters'),
                                                  this.databaseInformation,
                                                  this.fkInformation);
        this.existingFilterController = new FiltersController(existingFiltersView,
                                                              this);
        this.existingFilterController.prepareView();

        var filterView = new FilterView(this.$element.find('.filter'),
                                        this.databaseInformation,
                                        this.fkInformation);
        this.filterController = new FilterController(filterView,
                                                     this.databaseInformation,
                                                     this.tableName,
                                                     this);
        this.filterController.prepareView();
    },

    /**
     * Handler de cuando el usuario usa el filterView/filterController
     * para crear un nuevo filtro.
     *
     * En este caso se le tiene que notificar a la view de la tabla que
     * vuelva a cargar toda la informacion teniendo en cuenta el nuevo filtro
     */
    addFilter: function(filter) {
        this.filters.push(filter);

        this.existingFilterController.prepareView();
        this.tableController.getData();
    },

    /**
     * Handler de cuando el usuario quiere borrar un filtro basandose en
     * el indice del mismo.
     *
     * En este caso se tiene que notificar al tableView para que vuelva
     * a cargar la informacion sin ese filtro puntual.
     */
    removeFilter: function(filterIndex) {
        this.filters.pop(filterIndex);

        this.existingFilterController.prepareView();
        this.tableController.render();
    }

});
