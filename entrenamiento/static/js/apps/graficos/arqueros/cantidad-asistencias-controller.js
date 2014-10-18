/**
 * Controller que se encarga de hacer el grafico de la cantidad
 * de asistencias que hubo en cada uno de los meses.
 */
var CantidadAsistenciasController = Class.$extend({

    /**
     * Constructor.
     *
     * @param {jQuery} element: el elemento del DOM en donde es que se tiene que
     *                          graficar toda la informacion.
     *
     * @param {APIManager} apiManager: el manager que se va a usar para obtener
     *                                 toda la informacion a graficar.
     *
     * @param {SearchController} searchController: el controller que se quiere usar
     *                                             para filtrar toda la informacion
     *
     * @param {DatabaseInformation} databaseInformation: tiene toda la informacion sobre
     *                                                   los schemas de la base de datos
     */
    __init__: function(element, apiManager, searchController, databaseInformation) {
        this.$element = element;
        this.apiManager = apiManager;
        this.searchController = searchController;
        this.databaseInformation = databaseInformation;

        this.missingCallbacks = null;
        this.responseData = null;
    },

    /**
     * Se encarga de hacer el llamado ajax para obtener la informacion a graficar
     */
    render: function() {
        this.$element.mask('Loading');

        var filtersData = utils.translateFiltersToAPI(this.searchController.filters);

        var ajaxData = {
                groupBy: 'month(cuando)',
                orderDirection: 'ASC',
                columns: ['month(cuando)', 'count(id)'],
                filters: filtersData
        };

        this.apiManager.ajaxCall('asistencia/',
                                 ajaxData,
                                 'GET',
                                 $.proxy(this.renderInformation, this));

    },

    /**
     * Se encarga de renderar toda la informacion del grafico teniendo en cuenta
     * la respuesta del servidor.
     *
     * En este caso, la respuesta del request va a ser del estilo:
     *
     * {
     *      values: [
     *          [2014, 1, 8],
     *          [2014, 2, 3],
     *          ...
     *      ]
     * }
     *
     * donde:
     *
     *  - el primer valor corresponde al año de la asistencia
     *  - el segundo corresponde al mes
     *  - el tercer valor corresponde al count de la cantidad de asistencias de ese mes
     */
    renderInformation: function(data) {

        // voy a pasar todas las felcha a moment para poder
        // parsearlas mas rapido
        var parsedData = [];
        for (var i = 0; i < data.values.length; i++) {
            var tmp = data.values[i];
            parsedData.push([
                    Date.UTC(tmp[0], tmp[1] -1, 1),
                    tmp[2]
            ]);
        }


        this.$element.unmask();
        this.$element.find('.chart-container').highcharts({
            xAxis: {
                type: 'datetime',
            },
            series: [{
                name: 'Info',
                data: parsedData
            }]
        });
    }


})
