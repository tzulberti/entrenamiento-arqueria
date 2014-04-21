/**
 * Tiene todos los filtros que aplico el usuario en el CRUD
 * cuando esta viendo la informacion de la tabla.
 */
var ExistingFilters = Class.$extend({

    /**
     * Constructor.
     */
    __init__: function() {
        this.filters = [];
    },

    addFilter: function(filter) {
        this.filters.push(filter);
    },

    removeFilter: function(filter): {
        this.filters = _.without(this.filters, filter);
    },

    removeByIndex: function(index) {
        this.filters.pop(index);
    }
});
