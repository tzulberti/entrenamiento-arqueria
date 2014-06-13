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
     * @param {SearchController} searchController: el controller que tiene toda la
     *                                             informacion sobre de los filtros
     *                                             aplicados
     *
     */
    __init__: function(view, searchController) {
        this.view = view;
        this.searchController = searchController;

        this.prepareView();
    },

    prepareView: function() {
        this.view.render(this.searchController.filters);

        this.view.$element.find('.remove-filter').on('click', $.proxy(this.removeFilter, this));
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

        this.searchController.removeFilter(index);
    }
});
