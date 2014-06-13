/**
 * El controller de cuando el usuario ve la opcion de crear un
 * filtro para ver la informacion de la tabla.
 */
var FilterController = Class.$extend({

    /**
     * Constructor.
     *
     * @param {FilterView} view: la view que se encarga de renderar el html.
     *
     * @param {DatabaseInformation} databaseInformation: la informacion del
     *                                  schema de la base de datos.
     *
     * @param {String} tableName: el nombre de la tabla para la cual el usuario puede
     *                            aplicar el filtro.
     *
     * @param {SearchController} searchController: el controller que une todas las
     *                                             partes del search correspondiente.
     *
    */
    __init__: function(view, databaseInformation, tableName, searchController) {
        this.view = view;
        this.databaseInformation = databaseInformation;
        this.tableName = tableName;
        this.searchController = searchController;
    },

    prepareView: function() {
        var selectedColumnName = null;
        if (this.view.$element.find('.column-name').exists()) {
            selectedColumnName = this.view.$element.find('.column-name').val();
        } else {
            // en caso de que no haya seleccionado ninguna entonces marco
            // como opcion la primer columna de la tabla.
            var columnsInformation = this.databaseInformation.getTableColumns(this.tableName);
            selectedColumnName = columnsInformation[0].databaseName;
        }

        this.view.render(this.tableName, selectedColumnName);
        this.view.$element.find('.column-name').on('change', $.proxy(this.changedSelectedColumnName, this));
        this.view.$element.find('.operator').on('change', $.proxy(this.changedSelectedOperator, this));
        this.view.$element.find('.create').on('click', $.proxy(this.createFilter, this));
    },

    /*
     * Handler de cuando el usuario cambia la columna por la cual va a aplicar el filtro.
     */
    changedSelectedColumnName: function(ev) {
        ev.stopPropagation();
        ev.preventDefault();

        this.prepareView();
    },

    /**
     * Handler de cuando el usuario cambia el operador por el cual va a aplicar el filtro.
     */
    changedSelectedOperator: function(ev) {
    },

    /**
     * Handler de cuando el usuario selecciona la opcion para crear un filtro.
     */
    createFilter: function(ev) {
        ev.stopPropagation();
        ev.preventDefault();

        var selectedColumn = this.view.$element.find('.column-name').val();
        var selectedOperator = this.view.$element.find('.operators').val();
        var selectedValue = this.view.$element.find('.value').val();

        var emptyValue = false;
        if (selectedValue === null) {
            emptyValue = true;
        } else if ($.isArray(selectedValue) && selectedValue.length === 0) {
            emptyValue = true;
        } else if (selectedValue === '') {
            emptyValue = true;
        }

        if (emptyValue) {
            // no se puede crear un filtro con un id vacio.
            return;
        }

        var filter = new Filter(this.tableName,
                                selectedColumn,
                                selectedOperator,
                                selectedValue);

        this.searchController.addFilter(filter);
    }
});
