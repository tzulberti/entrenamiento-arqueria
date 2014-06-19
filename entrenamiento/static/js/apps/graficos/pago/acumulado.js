/**
 * Applicacion que use usa para que el usuario pueda ver el importe de los
 * pagos acumulados mes a mes.
 */
var PagosAcumuladosGraficoApp = BaseGraficosApp.$extend({

    __init__: function(element, historyManager, apiManager, databaseInformation) {
        this.$super(element, historyManager, apiManager,
                    databaseInformation, 'pago', 'Pagos Acumulados');
    },


    createChartController: function() {
        return new PagosAcumuladosController(this.$element,
                                             this.apiManager,
                                             this.searchController);
    }
});
