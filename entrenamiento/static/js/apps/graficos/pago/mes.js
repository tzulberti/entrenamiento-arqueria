/**
 * Applicacion que use usa para que el usuario pueda ver el importe de los
 * pagos mes a mes.
 *
 * A diferencia de la opcion anterior, en este caso no se muestra el acumulado
 * sino que cada mes es independiente del otro.
 */
var PagosPorMesGraficoApp = BaseGraficosApp.$extend({

    __init__: function(element, historyManager, apiManager, databaseInformation) {
        this.$super(element, historyManager, apiManager,
                    databaseInformation, 'pago', 'Pagos PagosPorMes');
    },


    createChartController: function() {
        return new PagosPorMesController(this.$element,
                                         this.apiManager,
                                         this.searchController);
    }
});
