/**
 * Controller que se encarga de hacer el grafico de la cantidad
 * de asistencias que hubo en cada uno de los meses.
 */
var MapaUsuariosController = Class.$extend({

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
            columns: ['latitud', 'longitud', 'direccion'],
            filters: filtersData
        };

        this.apiManager.ajaxCall('usuario/',
                                 ajaxData,
                                 'GET',
                                 $.proxy(this.renderInformation, this));

    },

    renderInformation: function(data) {

        // voy a pasar todas las felcha a moment para poder
        // parsearlas mas rapido
        var parsedData = [];
        for (var i = 0; i < data.values.length; i++) {
            var currentValue = data.values[i];
            parsedData.push({
                latitud: currentValue[0],
                longitud: currentValue[1],
                direccion: currentValue[2]
            });
        }

        var mapOptions = {
            zoom: 8,
            center: new google.maps.LatLng(-34.582561, -58.433361)
        }
        var geocoder = new google.maps.Geocoder();
        this.$element.find('.chart-container').width(this.$element.width() - 80);
        this.$element.find('.chart-container').height(600);
        var map = new google.maps.Map(this.$element.find('.chart-container')[0], mapOptions);


        var pool = [];
        for (var i = 0; i < parsedData.length; i++) {
            var currentValue = parsedData[i];
            if (currentValue.latitud) {
                var marker = new google.maps.Marker({
                        map: map,
                        position: new google.maps.LatLng(currentValue.latitud,
                                                         currentValue.longitud)
                });

            } else {
                var direccion = currentValue.direccion;
                if (direccion === null || direccion === '') {
                    continue
                }
                // tengo que hacer una magia para sacar la direccion del departamento
                // porque sino no me la encuentra
                if (direccion.indexOf('º') >= 0) {
                    direccion = direccion.substring(0, direccion.indexOf('º') - 1);
                } else if (direccion.indexOf('°') >= 0) {
                    direccion = direccion.substring(0, direccion.indexOf('°') - 1);
                }
                pool.push(direccion);

            }
        }

        valoresEncontrados = 0;
        valoresOverQueryLimit = 0;
        var numberOfCalls = 0;
        var self = this;
        intervalID = setInterval(function() {
            if (_.isEmpty(pool)) {
                clearInterval(intervalID);
                self.$element.unmask();
                return;
            }

            if (numberOfCalls >= 4) {
                return;
            }

            var direccion = pool.pop();
            numberOfCalls += 1;
            geocoder.geocode(
                {
                    'address': direccion,
                    'bounds': new google.maps.LatLngBounds(
                        new google.maps.LatLng(-34.8366775646, -58.9458222389),
                        new google.maps.LatLng(-34.307571499, -58.1079559326)
                    ),
                    'region': 'ar'
                },
                function(results, status) {
                    numberOfCalls -= 1;
                    if (status == google.maps.GeocoderStatus.OK) {
                        console.log('UPDATE usuario SET latitud = ' + results[0].geometry.location.lat() + ', longitud = ' + results[0].geometry.location.lng() + " WHERE direccion LIKE '%" + direccion + "';");
                        console.log(results[0]);
                        var marker = new google.maps.Marker({
                                map: map,
                                position: results[0].geometry.location
                        });
                        valoresEncontrados += 1;
                    } else {
                        if (status === 'ZERO_RESULTS') {
                            console.log(direccion);
                        } else if (status === 'OVER_QUERY_LIMIT') {
                            valoresOverQueryLimit += 1;
                        } else {
                            console.log(status);
                        }
                    }
                }
            );
        },
        200);


    }


})
