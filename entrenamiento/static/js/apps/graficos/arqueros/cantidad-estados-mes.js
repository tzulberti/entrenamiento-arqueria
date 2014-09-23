/**
 * Applicacion que muestra la cantidad de arqueros que hubo por cada mes
 */
var CantidadEstadosPorMesGraficoApp = BaseGraficosApp.$extend({

    __init__: function(element, historyManager, apiManager, databaseInformation) {
        this.$super(element, historyManager, apiManager,
                    databaseInformation, 'historia_estado_arquero', 'Cantidad de arqueros por estado por mes');
    },


    createChartController: function() {
        return new CantidadEstadosPorMesController(this.$element,
                                                   this.apiManager,
                                                   this.searchController,
                                                   this.databaseInformation);
    }
});
