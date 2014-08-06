/**
 * El controller que se usa para editar/crear la informacion del resultado de un
 * torneo
 */
var TorneoFormController = FormController.$extend({

    __init__: function(formView, apiManager, crudView) {
        this.$super(formView, apiManager, 'torneo', 'upload/torneo/', crudView);

        this.rondasData = null;
        this.seriesData = null;
    },

    /**
     * Se encarga de renderar la informacion basica del torneo en cuestion.
     */
    _renderForm: function(objectData, validationErrors) {
        this.formView.renderTorneoInformation(objectData, validationErrors);


        this.formView.$element.find('.button-save').on('click', $.proxy(this.saveInformation, this));
        this.formView.$element.find('#id_tipo_de_torneo').on('change', $.proxy(this.changedTipoDeTorneo, this));
        if (objectData === null) {
            this.formView.$element.find('#id_tipo_de_torneo').trigger('change');
        } else {
            this.formView.$element.find('#id_tipo_de_torneo').trigger('change');
        }
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
        this._renderSeriesForms();
        this.apiManager.ajaxCallObject({
            url: 'ronda/',
            data: {
                'filters': ['ronda|id_torneo|eq|' + this.objectId],
                'orderBy': 'id'
            },
            type: 'GET',
            successCallback: $.proxy(this.gotRondasInformation, this)
        });
    },

    /**
     * Una vez que se obtuvo toda la informacion de las rondas, se encarga
     * de obtener toda la informacion de todas las series de las mismas.
     */
    gotRondasInformation: function(responseData, textStatus, jqXHR) {
        this.rondasData = responseData.values;
        // ahora, para cada una de esas series, tengo que obtener la informacion
        //var ids = [];
        for (var i = 0; i < this.rondasData.length; i++) {
            //ids.push(this.rondasData[i].id);
            utils.renderFormData(this.formView.$element.find('.ronda-' + (i + 1) + '-div'),
                                 this.rondasData[i],
                                 '');
        }

        this.formView.$element.unmask();



        /*
        this.apiManager.ajaxCallObject({
            url: '/ronda/',
            data: {
                'f-0': 'serie;id_ronda;in;' + ids,
                'orderBy': 'id'
            },
            type: 'GET',
            successCallback: $.proxy(this.gotSeriesInformation, this)
        });
        */
    },

    /**
     * Handler de cuando se obtiene toda la informacion de las series
     * de todas las rondas del torneo.
     */
    gotSeriesInformation: function(responseData, textStatus, jqXHR) {

    },


    /**
     * Handler de cuando el usuario cambia el tipo de torneo para que
     * se muestren los forms correspondientes.
     */
    changedTipoDeTorneo: function(ev) {
        ev.preventDefault();
        ev.stopPropagation();

        this._renderSeriesForms();
    },

    /**
     * Se encarga de renderar todos los forms para el tema de las diferentes series
     * del torneo.
     *
     * Se lo hizo en un metodo aparte por que se necesitaba que no sea asincronico.
     */
    _renderSeriesForms: function() {
        this.formView.$element.find('.rondas-information').clean();
        var tipoTorneoId = this.formView.$element.find('#id_tipo_de_torneo').val();
        tipoTorneoId = parseInt(tipoTorneoId, 10);
        var tipoDeTorneoInformation = this.formView.torneoFkInformation.getValue('tipo_torneo', tipoTorneoId);


        for (var i = 1; i <= tipoDeTorneoInformation.numero_de_rondas; i++) {
            this.formView.renderRondaInformation(null, null, i);
            var divElement = this.formView.$element.find('.ronda-' + i + '-div');
            var distanciaElement = divElement.find('#distancia');
            distanciaElement.val(tipoDeTorneoInformation['distancia_ronda_' + i]);
            distanciaElement.prop('disabled', true);

            var elem = divElement.find('input:file');
            elem.pekeUpload({
                showFilename: false,
                showPercent: false,
                onSubmit: false,
                theme: "bootstrap",
                multi: true,
                url: '/api/v01/upload/ronda/',
                onFileSuccess: $.proxy(this.handleUploadedFile, this, i, elem)
            });
        }
    },

    /**
     * Handler de cuando un archivo se pudo subir bien.
     *
     * @param {int} index: el indice de los forms para el cual se subio la imagen.
     *
     * @param {jQuery} element: el elemento que esta siendo usado por pekeUpload.
     *
     * @param {Object} file: tiene informacion sobre el archivo subido.
     *
     * @param {Object} data: tiene otra informacion sobre el archivo que se subio.
     */
    handleUploadedFile: function(index, element, file, data) {

        var divElement = this.formView.$element.find('.ronda-' + index + '-div');
        var columnName = element.attr('name');
        columnName = columnName.replace('_upload', '');
        var hiddenElement = divElement.find('#' + columnName);
        if (! hiddenElement.exists()) {
            throw new Error('Algo esta mal configurado porque no se encuentra el hidden element');
        }

        hiddenElement.val(data.filename);
        divElement.find('#' + columnName + '_existing').html(
                '<a href="/uploads/' + data.filename + '/"><img src="/uploads/' + data.thumb_filename + '/"></a>');
        // porque hay un bug cuando pongo multi en True, y que
        // no muestre la barra
        divElement.find('.file').clean();
    },


    /**
     * Handler de cuando se pudo guardar la informacion del torneo.
     *
     * Se encarga de hacer el llamado ajax para guardar la informacion de cada
     * una de las series.
     */
    savedInformation: function(response, textStatus, jqXHR) {
        var tipoTorneoId = this.formView.$element.find('#id_tipo_de_torneo').val();
        tipoTorneoId = parseInt(tipoTorneoId, 10);
        var tipoDeTorneoInformation = this.formView.torneoFkInformation.getValue('tipo_torneo', tipoTorneoId);
        this._saveRonda(1, response.id, tipoDeTorneoInformation);
    },

    /**
     * Se encarga de guardar toda la informacion de la ronda especificada
     *
     * Si no existe informacion para el identicifador de la ronda, entonces
     * es que se guardo toda la informacion de todas las rondas del
     * torneo
     *
     * @param {int} rondaIndex: el indice de la ronda que se tiene que guardar
     *
     * @param {int} idTorneo: el identificador del torneo que se quiere guardar.
     */
    _saveRonda: function(rondaIndex, idTorneo, tipoDeTorneoInformation) {

        var divRonda = this.formView.$element.find('.ronda-' + rondaIndex + '-div');
        if (! divRonda.exists()) {
            // sino existe una ronda con ese identificador, entonces
            // es que se guardo toda la informacion de todas las rondas
            this.crudView.createdObject(idTorneo);
            return;
        }

        var data = divRonda.find('form').serializeObject();
        data.id_torneo = idTorneo;
        data.distancia = tipoDeTorneoInformation['distancia_ronda_' + rondaIndex];

        if (! (data.puntaje || data.foto_path)) {
            // en este caso no se cargo la informacion de las rondas, por lo
            // que no puedo guardar la misma.
            this.crudView.createdObject(idTorneo);
            return;
        }

        this.apiManager.ajaxCallObject({
            url: 'ronda/',
            type: 'POST',
            data: data,
            successCallback: $.proxy(this._saveRonda, this, rondaIndex + 1, idTorneo, tipoDeTorneoInformation),
            errorCallback: $.proxy(this.errorSavingInformation, this)
        });
    }
});
