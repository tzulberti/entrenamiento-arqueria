/**
 * La aplicacion que hace un grafico para marcar la cantidad de asistencias
 * que hubo en un periodo de tiempo
 */
var MapaUsuariosGraficoApp = BaseGraficosApp.$extend({

    __init__: function(element, historyManager, apiManager, databaseInformation) {
        this.$super(element, historyManager, apiManager,
                    databaseInformation,
                    'usuario',
                    'Mapa de los usuarios');
    },


    createChartController: function() {
        return new MapaUsuariosController(this.$element,
                                          this.apiManager,
                                          this.searchController,
                                          this.databaseInformation);
    }

})
