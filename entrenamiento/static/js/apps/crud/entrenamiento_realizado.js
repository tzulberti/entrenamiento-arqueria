/**
 * La APP que se va a usar para poder cargar la informacion
 * del entrenamiento que hizo el arquero
 */
var EntrenamientoRealizadoCrudApplication = BaseCrudApp.$extend({

    __init__: function(element, historyManager, apiManager, databaseInformation) {
        this.$super(element,
                    historyManager,
                    apiManager,
                    databaseInformation,
                    'entrenamiento_realizado',
                    ['cuando', 'id_usuario']);


        this.entrenamientoFlechasFkInformation = null;
        this.entrenamientoFlechasMissingCallbacks = null;
    },

    /**
     * Sobrescribe el metodo para que tambien se busque la informacion de las FK
     * de las flechas.
     */
    start: function(superHack) {
        if (superHack) {
            return this.$super();
        }
        this.entrenamientoFlechasMissingCallbacks = {};
        this.entrenamientoFlechasFkInformation = new FkInformation();

        var tableColumns = this.databaseInformation.getTableColumns('entrenamiento_flechas');
        var hasFks = false;
        for (var i = 0; i < tableColumns.length; i++) {
            var columnInfo = tableColumns[i];
            if (columnInfo.foreignKey === null) {
                continue;
            }
            if (columnInfo.isConst()) {
                continue;
            }
            if (_.has(this.entrenamientoFlechasMissingCallbacks, columnInfo.foreignKey)) {
                continue;
            }

            hasFks = true;
            this.entrenamientoFlechasMissingCallbacks[columnInfo.foreignKey] = true;
            this.apiManager.ajaxCallObject({
                url: columnInfo.foreignKey + '/',
                data: {
                    fkInformation: true
                },
                type: 'GET',
                successCallback: $.proxy(this.gotInformationForFlechas, this, columnInfo.foreignKey)
            });
        }
    },

    gotInformationForFlechas: function(modelName, response, textStatus, jqXHR) {
        this.entrenamientoFlechasMissingCallbacks[modelName] = false;
        this.entrenamientoFlechasFkInformation.parseTableResponse(modelName, response.values);

        var missingData = _.values(this.entrenamientoFlechasMissingCallbacks);
        var shouldContinue = true;
        for (var j = 0; j < missingData.length; j++) {
            if (missingData[j]) {
                shouldContinue = false;
                break;
            }
        }

        if (! shouldContinue) {
            return;
        }


        this.start(true);
    },



    createFormController: function() {
        var view = new EntrenamientoRealizadoFormView(this.$element.find('.form-container'),
                                                      this.databaseInformation.getTableColumns('entrenamiento_realizado'),
                                                      this.fkInformation,
                                                      this.databaseInformation.getTableColumns('entrenamiento_flechas'),
                                                      this.entrenamientoFlechasFkInformation);
        var controller = new EntrenamientoRealizadoFormController(view,
                                                                  this.apiManager,
                                                                  this);
        return controller;
    }
});
