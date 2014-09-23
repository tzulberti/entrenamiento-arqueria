/**
 * Controller que se usa para crear el grafico de cuantos arqueros hay en cada
 * estado en cada mes.
 */
var CantidadEstadosPorMesController = Class.$extend({

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
                orderBy: 'desde',
                orderDirection: 'ASC',
                columns: ['desde', 'hasta', 'id_estado_arquero'],
                filters: filtersData
        };

        this.missingCallbacks = [true, true];
        this.responseData = [null, null];
        this.apiManager.ajaxCall('historia_estado_arquero/',
                                 ajaxData,
                                 'GET',
                                 $.proxy(this.renderInformation, this));

    },

    /**
     * Se encarga de renderar toda la informacion del grafico teniendo en cuenta
     * la respuesta del servidor.
     *
     *
     * En este caso, la inforamcion de los dos requests viene dado en el siguiente
     * formato:
     *
     * {
     *      values: [
     *          ['01/01/2013', '04/01/2013', 2],
     *          ['01/01/2013', '04/01/2013', 3],
     *          ...
     *      ]
     * }
     *
     * donde:
     *
     *  - el primer valor corresponde al mes del estado
     *  - el segundo corresponde al id del estado
     *  - el tercer valor corresponde al count de la cantidad de clientes.
     */
    renderInformation: function(data) {
        // voy a pasar todas las felcha a moment para poder
        // parsearlas mas rapido
        var parsedData = [];
        for (var i = 0; i < data.values.length; i++) {
            var tmp = data.values[i];
            parsedData.push([
                    moment(tmp[0], consts.DATE_RESPONSE_FORMAT),
                    tmp[1] !== null ? moment(tmp[1], consts.DATE_RESPONSE_FORMAT) : null,
                    tmp[2]
            ]);
        }


        // ahora voy a ir juntando la informacion mes a mes, para ver cual
        // es el maximo y cual es el minimo
        var minDate = _.min(parsedData, function(d) {
            return d[0];
        })[0];
        var maxDate = _.max(parsedData, function(d) {
            return d[0];
        })[0];

        var datesDifference = utils.getMonthsDifference(minDate, maxDate);
        var finalData = [];
        var columnInformation = this.databaseInformation.getColumnInformation('historia_estado_arquero',
                                                                              'id_estado_arquero');
        for (var id = 1; id <= 4; id++) {
            var idData = [];
            for (var monthIndex = 0; monthIndex <= datesDifference; monthIndex++) {
                idData.push(0);
            }
            finalData.push({
                name: columnInformation.getConstValue(id).value,
                data: idData
            });
        }

        var xCategories = [];
        var aux = moment(minDate);
        for (var monthIndex = 0; monthIndex <= datesDifference; monthIndex++) {
            xCategories.push(aux);
            aux = moment(aux);
            aux.add('months', 1);
        }

        // ahora para cada id tengo que contar la cantidad de valores
        // que hay
        for (var id = 1; id <= 4; id++) {
            var dataForId = finalData[id - 1].data;
            for (var j = 0; j < parsedData.length; j++) {
                var currentData = parsedData[j];
                if (currentData[2] !== id) {
                    continue;
                }

                // ahora si estoy en el mismo id, entonces me tengo que
                // fijar que a que meses tengo que sumar o si es solo uno
                if (id === consts.ESTADO_ARQUERO.activo || id === consts.ESTADO_ARQUERO.pasivo) {
                    // en este caso se tiene que acumular mes a mes el valor
                    // en el que estuvo en este estado.
                    var startingIndex = utils.getMonthsDifference(minDate, currentData[0]);
                    if (currentData[1] === null) {
                        for (var k = startingIndex; k < dataForId.length; k++) {
                            dataForId[k] += 1;
                        }

                    } else {
                        // en este caso tengo una fecha fin por lo que se hasta
                        // que mes tengo que acumular
                        endingIndex = utils.getMonthsDifference(currentData[1], minDate);
                        for (var k = startingIndex; k < endingIndex; k++) {
                            dataForId[k] += 1;
                        }
                    }
                } else {
                    // en este caso solo sumo al mes correspondiente
                    var startingIndex = utils.getMonthsDifference(minDate, currentData[0]);
                    dataForId[startingIndex] += 1;
                }
            }
        }

        this.$element.unmask();
        this.$element.find('.chart-container').highcharts({
            chart: {
                type: 'column'
            },
            xAxis: {
                type: 'datetime',
                categories: xCategories
            },
            series: finalData
        });
    }

});
