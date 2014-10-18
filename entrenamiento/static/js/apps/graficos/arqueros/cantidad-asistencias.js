/**
 * La aplicacion que hace un grafico para marcar la cantidad de asistencias
 * que hubo en un periodo de tiempo
 */
var CantidadAsistenciasGraficoApp = BaseGraficosApp.$extend({

    __init__: function(element, historyManager, apiManager, databaseInformation) {
        this.$super(element, historyManager, apiManager,
                    databaseInformation, 'asistencia', 'Cantidad de asistencias por estado por mes');
    },


    createChartController: function() {
        return new CantidadAsistenciasController(this.$element,
                                                 this.apiManager,
                                                 this.searchController,
                                                 this.databaseInformation);
    }

})
