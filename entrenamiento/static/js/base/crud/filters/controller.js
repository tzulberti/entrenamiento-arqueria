/**
 * Controller para la view que muestra todos los filtros aplicados por el
 * usuario.
 */
var FiltersController = Class.$extend({

    /**
     * Constructor.
     *
     * @param {FiltersView} view: la view que se encarga de mostrar todos los
     *                            filtros que existen.
     *
     * @param {ExistingFilters} existingFilters: los filtros que aplico el usuario.
     */
    __init__: function(view, existingFilters) {
        this.view = view;
        this.existingFilters = existingFilters;

        this.prepareView();
    },

    prepareView: function() {
        this.view.render(this.existingFilters);

        this.view.$element.on('click', '.remove-filter', $.proxy(this.removeFilter, this));
    },

    /**
     * Handler de cuando el usuario hace clic en la X para remover un filtro
     * que ya existe.
     */
    removeFilter: function(ev) {
        ev.stopPropagation();
        ev.preventDefault();

        var $target = $(ev.target);
        var index = $target.attr('id');
        index = index.replace('remove-filter-', '');
        index = parseInt(index, 10);

        this.existingFilters.removeByIndex(index);
    }
});
