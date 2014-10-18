/**
 * El controller que se usa para editar/crear la informacion del resultado de un
 * torneo
 */
var EntrenamientoRealizadoFormController = FormController.$extend({

    __init__: function(formView, apiManager, crudView) {
        this.$super(formView, apiManager, 'entrenamiento_realizado', 'upload/entrenamiento_realizado/', crudView);

        this.entrenamientoFlechasData = null;
    },

    /**
     * Se encarga de renderar la informacion basica del torneo en cuestion.
     */
    _renderForm: function(objectData, validationErrors) {
        this.formView.renderEntrenamientoRealizadoInformation(objectData, validationErrors);


        this.formView.$element.find('.button-save').on('click', $.proxy(this.saveInformation, this));
        this.formView.$element.find('.add-flechas').on('click', $.proxy(this.addNuevasFlechasHandler, this));
    },



    /**
     * Handler de obtener la informacion del torneo.
     *
     * Ademas de obtener la informacion del torneo, tambien me tengo que
     * encargar de buscar la informacion sobre las rondas del torneo.
     */
    gotObjectInformation: function(responseData, textStatus, jqXHR) {
        this._renderForm(responseData, null);

        this.formView.$element.mask('Loading');
        this.apiManager.ajaxCallObject({
            url: 'entrenamiento_flechas/',
            data: {
                'filters': ['entrenamiento_flechas|id_entrenamiento_realizado|eq|' + this.objectId],
                'orderBy': 'id'
            },
            type: 'GET',
            successCallback: $.proxy(this.gotFlechasInformation, this)
        });
    },

    /**
     * Una vez que se obtuvo toda la informacion de las felchas que tiro
     * el arquero, se encarga de renderar la informacion correspondiente
     */
    gotFlechasInformation: function(responseData, textStatus, jqXHR) {
        this.entrenamientoFlechasData = responseData.values;
        // ahora, para cada una de esas series, tengo que obtener la informacion
        //var ids = [];
        for (var i = 0; i < this.entrenamientoFlechasData.length; i++) {
            this.formView.renderEntrenamientoFlechasInformation(this.entrenamientoFlechasData[i],
                                                                null,
                                                                i);
        }

        this.formView.$element.unmask();
    },


    /**
     * Handler de cuando el usuario hace clic para agregar un nuevo entrenamiento de
     * flechas.
     */
    addNuevasFlechasHandler: function(ev) {
        ev.stopPropagation();
        ev.preventDefault();

        this.formView.addEntrenamientoFlechas();
    },



    /**
     * Handler de cuando se pudo guardar la informacion del torneo.
     *
     * Se encarga de hacer el llamado ajax para guardar la informacion de cada
     * una de las series.
     */
    savedInformation: function(response, textStatus, jqXHR) {
        this.saveEntrenamientoFlechas(0, response.id);
    },

    /**
     * Se encarga de guardar toda la informacion del entrenamiento de flechas
     * relaizado.
     *
     * Sino existe informacion para el identificador de las flechas, entonces
     * es que se guardo toda la informacion de todas las flechas.
     *
     * @param {int} flechasIndex: el indice de las flechas que se quiere guardar
     *
     * @param {int} idEntrenamientoRealizado: el identificador del entrenamiento
     *                                        al que pertencen las flechas.
     */
    saveEntrenamientoFlechas: function(flechasIndex, idEntrenamientoRealizado) {
        var divFlechas = this.formView.$element.find('.flechas-' + flechasIndex + '-div');
        if (! divFlechas.exists()) {
            // sino existe un div con esa informacion entonces tengo que ya
            // guarde toda la informacion.
            this.crudView.createdObject(idEntrenamientoRealizado);
            return;
        }

        var data = divFlechas.find('form').serializeObject();
        data.id_entrenamiento_realizado = idEntrenamientoRealizado;


        if (! data.cantidad_de_flechas) {
            // sino ingreo la cantidad de flechas que queria entonces tengo que
            // parar
            this.crudView.createdObject(idEntrenamientoRealizado);
            return;
        }

        this.apiManager.ajaxCallObject({
            url: 'entrenamiento_flechas/',
            type: 'POST',
            data: data,
            successCallback: $.proxy(this.saveEntrenamientoFlechas, this, flechasIndex + 1, idEntrenamientoRealizado),
            errorCallback: $.proxy(this.errorSavingInformation, this)
        });
    }

});
