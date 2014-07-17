/**
 * Se encarga de mostrar en un grafico de barras, la suma de los
 * pagos de cada uno de los meses.
 *
 */
var PagosPorMesController = Class.$extend({

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
                orderBy: 'mes_correspondiente',
                groupBy: 'mes_correspondiente',
                orderDirection: 'ASC',
                columns: ['mes_correspondiente', 'SUM(importe)', 'COUNT(id)'],
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
     *          ['01/01/2013', 123, 1],
     *          ['01/02/2013', 466, 2],
     *          ...
     *      ]
     * }
     *
     * donde:
     *
     *  - el primer valor corresponde al mes_correspondiente
     *  - el segundo valor corresponde a la suma de los importes que se hizo
     *    ese mes
     *  - el tercer valor corresponde a la cantidad de pagos hechos eses
     *    mes
     *
     */
    renderInformation: function(data) {
        this.$element.unmask();

        // por mas de que tengo el importe dia a dia, tengo que calcular el
        // acumulado correspondiente.
        var pagosMes = [];
        for (var i = 0; i < data.values.length; i++) {
            pointData = data.values[i];
            var date = moment(pointData[0], 'DD/MM/YYYY');
            var utcDate = Date.UTC(date.year(), date.month(), date.date());
            pagosMes.push([utcDate, pointData[1]]);
        }

        this.$element.find('.chart-container').highcharts({
            xAxis: {
                type: 'datetime'
            },
            series: [{
                name: 'Pagos mes a mes',
                data: pagosMes
            }]
        });

    }

});
