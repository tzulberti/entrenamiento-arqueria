/**
 * Applicacion que muestra la cantidad de arqueros que hubo por cada mes
 */
var FlechasAcumuladasGraficoApp = BaseGraficosApp.$extend({

    __init__: function(element, historyManager, apiManager, databaseInformation) {
        this.$super(element,
                    historyManager,
                    apiManager,
                    databaseInformation,
                    'entrenamiento_realizado',
                    'Cantidad de flechas acumuladas');
    },


    createChartController: function() {
        return new FlechasAcumuladasController(this.$element,
                                               this.apiManager,
                                               this.searchController);
    }
});
