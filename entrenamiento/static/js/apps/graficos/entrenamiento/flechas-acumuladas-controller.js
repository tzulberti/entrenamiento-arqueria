/**
 * Se encarga de hacer el grafico para que el usuario pueda
 * ver la cantidad de flechas acumuladas que tiene hasta la fecha.
 *
 */
var FlechasAcumuladasController = Class.$extend({

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

    /**
     * Se encarga de hacer el llamado ajax para obtener la informacion necesaria.
     */
    render: function() {
        this.$element.mask('Loading');

        var filtersData = utils.translateFiltersToAPI(this.searchController.filters);

        var ajaxData = {
                join: 'entrenamiento_realizado',
                orderBy: 'entrenamiento_realizado.cuando',
                groupBy: 'entrenamiento_realizado.cuando',
                orderDirection: 'ASC',
                columns: ['entrenamiento_realizado.cuando', 'SUM(cantidad_de_flechas)'],
                filters: filtersData
        };

        this.apiManager.ajaxCall('entrenamiento_flechas/',
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
            var date = moment(pointData[0], 'DD/MM/YYYY');
            var utcDate = Date.UTC(date.year(), date.month(), date.date());
            chartData.push([utcDate, pointData[1] + acumulado]);
            acumulado += pointData[1];
        }

        this.$element.find('.chart-container').highcharts({
            xAxis: {
                type: 'datetime'
            },
            series: [{
                name: 'Acumulado',
                data: chartData
            }]
        });

    }

});
