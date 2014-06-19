/**
 * Se encarga de hacer un grafico de timeline en donde se muestra como
 * va subiendo los pagos hechos por los arqueros.
 *
 */
var PagosAcumuladosController = Class.$extend({

    /**
     * Constructor.
     *
     * @param {jQuery} element: el elemento del DOM en donde es que se tiene que
     *                          graficar toda la informacion.
     *
     * @param {APIManager} apiManager: el manager que se va a usar para obtener
     *                                 toda la informacion a graficar.
     */
    __init__: function(element, apiManager, searchController) {
        this.$element = element;
        this.apiManager = apiManager;
        this.searchController = searchController;
    },

    render: function() {
        this.$element.mask('Loading');

        var filtersData = utils.translateFiltersToAPI(this.searchController.filters);

        var ajaxData = {
                orderBy: 'cuando',
                groupBy: 'cuando',
                orderDirection: 'ASC',
                columns: ['cuando', 'SUM(importe)'],
                filters: filtersData
        };

        this.apiManager.ajaxCall('pago/',
                                 ajaxData,
                                 'GET',
                                 $.proxy(this.renderInformation, this));
    },

    /**
     * Se encarga de renderar toda la informacion del grafico teniendo en cuenta
     * la respuesta del servidor.
     *
     * En este caso, la informacion del mismo viene en el siguiente formato:
     *
     * {
     *      values: [
     *          ['01/01/2013', 123],
     *          ['31/01/2013', 466],
     *          ...
     *      ]
     * }
     *
     * donde:
     *
     *  - el primer valor corresponde al cuando
     *  - el segundo valor corresponde a la suma de los importes que se hizo
     *    ese dia.
     */
    renderInformation: function(data) {
        this.$element.unmask();

        // por mas de que tengo el importe dia a dia, tengo que calcular el
        // acumulado correspondiente.
        var acumulado = 0;
        var chartData = [];
        for (var i = 0; i < data.values.length; i++) {
            pointData = data.values[i];
            chartData.push([pointData[0], pointData[1] + acumulado]);
            acumulado += pointData[1];
        }

        this.$element.find('.chart-container').highcharts({
            series: [{
                name: 'Acumulado',
                data: chartData
            }]
        });

    }

});
