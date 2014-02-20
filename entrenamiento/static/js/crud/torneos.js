var TorneoFormView = BaseFormView.$extend({

    __init__: function(element) {
        this.$super(element);

        this.rondasTemplate = '' +
            '{{#each rondas }}' +
                '<form role="form" class="form-horizontal ronda-{{ @index }}-form" enctype="multipart/form-data">' +
                    '<input type="hidden" name="id-ronda-{{ @index }}" id="id-ronda-{{ @index }}"></input>' +
                    '<input type="hidden" name="foto-ronda-{{ @index }}" id="foto-ronda-{{ @index }}"></input>' +
                    '{{setIndex "indexRonda" @index}}' +
                    '<formset>' +
                        '<h3>Ronda {{ @index }}</h3>' +
                        '<div class="form-group">' +
                            '<label for="distancia-ronda-{{ @index }}" class="col-sm-2 control-label">Distancia</label>' +
                            '<div class="col-sm-10">' +
                                '<input type="text" name="distancia-ronda-{{ @index}}" class="form-control" disabled value="{{ this.distancia }}">'+
                            '</div>' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="puntaje-ronda-{{ @index }}" class="col-sm-2 control-label">Puntaje final</label>' +
                            '<div class="col-sm-10">' +
                                '<input type="text" name="puntaje-ronda-{{ @index }}" id="puntaje-ronda-{{ @index }}" class="form-control"/>' +
                                '<span class="help-block">El puntaje que hiciste en esta ronda sin tener en cuenta las series de practica</span>' +
                            '</div>' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="foto_planilla-ronda-{{ @index }}" class="col-sm-2 control-label">Foto planilla</label>' +
                            '<div class="col-sm-10">' +
                                '<input type="file" name="foto_planilla-ronda-{{ @index }}" id="foto_planilla-ronda-{{ @index }}" class="form-control" />' +
                            '</div>' +
                        '</div>' +
                        '<table class="table puntajes-serie">' +
                            '<tr>' +
                                '<th>Numero de serie</th>' +
                                '<th>Fue de practica?</th>' +
                                '{{#rangeEach ../numeroDeFlechas }}' +
                                    '<th>Puntaje flecha {{ @index }}</th>' +
                                '{{/rangeEach}}' +
                                '<th>Puntaje total</th>' +
                            '</tr>' +
                            '{{#rangeEach this.seriesDePractica }}' +
                                '{{setIndex "indexSeriePractica" @index }}' +
                                '<tr>' +
                                    '<td>' +
                                        'Practica {{ @index }}' +
                                    '</td>' +
                                    '<td>' +
                                        '<input type="checkbox" name="serie-{{ indexSeriePractica }}-ronda-{{ ../indexRonda }}-practica-fue-de-practica" id="serie-{{ indexSeriePractica }}-ronda-{{ ../indexRonda }}-practica-fue-de-practica" checked disabled>' +
                                    '</td>' +
                                    '{{#rangeEach ../../numeroDeFlechas }}'+
                                        '<td>' +
                                            '<input type="text" name="serie-{{ ../indexSeriePractica }}-ronda-{{ ../../indexRonda }}-practica-puntaje-flecha-{{ @index }}" id="serie-{{ ../indexSeriePractica }}-ronda-{{ ../../indexRonda }}-practica-puntaje-flecha-{{ @index }}">' +
                                        '</td>' +
                                    '{{/rangeEach }}' +
                                    '<td>' +
                                        '<input type="text" name="serie-{{ indexSeriePractica }}-ronda-{{ ../indexRonda }}-practica-puntaje-total" id="serie-{{ indexSeriePractica }}-ronda-{{ ../indexRonda }}-practica-puntaje-total">' +
                                    '</td>' +
                                '</tr>' +
                            '{{/rangeEach}}' +
                            '{{#rangeEach ../numeroDeSeries }}' +
                                '{{setIndex "indexSerie" @index }}' +
                                '<tr>' +
                                    '<td>' +
                                        'Serie {{ @index }}' +
                                    '</td>' +
                                    '<td>' +
                                        '<input type="checkbox" name="serie-{{ indexSerie }}-ronda-{{ ../indexRonda }}-fue-de-practica" id="serie-{{ indexSerie }}-ronda-{{ ../indexRonda }}-fue-de-practica" disabled>' +
                                    '</td>' +
                                    '{{#rangeEach ../../numeroDeFlechas }}'+
                                        '<td>' +
                                            '<input type="text" name="serie-{{ ../indexSerie }}-ronda-{{ ../../indexRonda }}-puntaje-flecha-{{ @index}}" id="serie-{{ ../indexSerie }}-ronda-{{ ../../indexRonda }}-puntaje-flecha-{{ @index }}">' +
                                        '</td>' +
                                    '{{/rangeEach }}' +
                                    '<td>' +
                                        '<input type="text" name="serie-{{ indexSerie }}-ronda-{{ ../indexRonda }}-puntaje-total" id="serie-{{ indexSerie }}-ronda-{{ ../indexRonda }}-puntaje-total">' +
                                    '</td>' +
                                '</tr>' +
                            '{{/rangeEach}}' +
                        '</table>' +
                    '</formset>' +
                '</form>' +
            '{{/each}}';

        this.torneoTemplate = '' +
            '<form role="form" class="form-horizontal torneo-information">' +
                '<formset>' +
                    '<input type="hidden" name="torneo_id" id="torneo_id"></input>' +
                    '<h3>Informacion del torneo</h3>' +
                    '<div class="checkbox">' +
                        '<label>' +
                            '<input type="checkbox" name="fue_practica" id="fue_practica" />Fue de practica?</label>' +
                            '<span class="help-block">Tenes que tildar esta opcion si el mismo fue en el maldonado en el campo de olivos</span>' +
                        '</label>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="cuando" class="col-sm-2 control-label">Cuando</label>' +
                        '<div class="col-sm-10">' +
                            '<input type="text" name="cuando" id="cuando" class="form-control">' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">'+
                        '<label for="tipo_de_torneo" class="col-sm-2 control-label">Tipo de torneo</label>' +
                        '<div class="col-sm-10">' +
                            '<select name="tipo_de_torneo" id="tipo_de_torneo" class="form-control">' +
                                '{{#each tipoTorneoGroup}}' +
                                    '<optgroup label="{{ this.groupLabel }}">' +
                                        '{{#each this.tipoTorneos}}' +
                                            '<option value="{{ this.id }}">{{ this.nombre }}</option>' +
                                        '{{/each}}'+
                                    '</optgroup>' +
                                '{{/each}}' +
                            '</select>' +
                        '</div>'+
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="puntaje_final_torneo" class="col-sm-2 control-label">Puntaje</label>' +
                        '<div class="col-sm-10">' +
                            '<input type="text" name="puntaje_final_torneo" id="puntaje_final_torneo" class="form-control">' +
                            '<span class="help-block">El puntaje final hecho teniendo en cuenta todas las series</span>' +
                        '</div>'+
                    '</div>'+
                    '<div class="form-group">' +
                        '<label for="id_lugar" class="col-sm-2 control-label">Donde fue el torneo?</label>' +
                        '<div class="col-sm-10">' +
                            '<select name="id_lugar" id="id_lugar" class="form-control">'  +
                                '<option value=""></option>' +
                                '{{#each lugares}}' +
                                    '<option value="{{ this.id }}">{{ this.nombre }}</option>' +
                                '{{/each}}'+
                            '</select>' +
                        '</div>' +
                    '</div>' +
                '</formset>' +
            '</form>' +
            '<div class="rondas-information">' +
            '</div>' +
            '<div class="form-group">' +
                '<div class="col-sm-10 col-sm-offset-2">' +
                    '<button type="submit" class="btn btn-primary button-save">Grabar</button>' +
                '</div>' +
            '</div>';
    },

    /**
     * Se encarga de buscar toda la informacion sobre los diferentes lugares en los que
     * el usuario puede haber tirado un toreneo.
     *
     * Cuando llegue la respuesta de eso, se encarga de renderar el form.
     */
    renderBaseHtml: function() {
        var self = this;
        $.ajax({
            type: 'GET',
            url: '/api/v01/lugar/',
            success: function(data, textStatus, jqXHR) {
                self.renderInformation(data);
            }
        });
    },

    /**
     * Callback de cuando se hace el llamadao para obtener la informacion de los
     * lugares en donde se puede haber hecho el torneo.
     *
     * El mismo se va a ocupar de renderar el html.
     */
    renderInformation: function(data, textStatus, jqXHR) {
        var lugares = data.values;
        var html = Handlebars.render(this.torneoTemplate, {
            lugares: lugares,
            tipoTorneoGroup: consts.tipoTorneos.ordenarForTemplate()
        });
        this.$element.empty();
        this.$element.html(html);

        this.$element.off('change', '#tipo_de_torneo');
        this.$element.off('click', '.button-save');

        this.$element.on('change', '#tipo_de_torneo', $.proxy(this.changedTorneoType, this));
        this.$element.on('click', '.button-save', $.proxy(this.saveInformation, this));


        this.$element.find('#cuando').datepicker({
            format: 'dd/mm/yyyy'
        });
        this.$element.find('#tipo_de_torneo').change();
    },

    /**
     * Handler de cuando el usuario elige cambiar el tipo de torneo.
     *
     * Se encarga de mostrar toda la informacion de las series y de ls rondas
     * teniendo en cuenta la informacion del torneo.
     */
    changedTorneoType: function(ev) {
        ev.stopPropagation();
        ev.preventDefault();

        var $target = $(ev.target);
        var idTipoTorneo = $target.val();
        idTipoTorneo = parseInt(idTipoTorneo, 10);

        var tipoTorneo = consts.tipoTorneos.getById(idTipoTorneo);
        var rondasHtml = Handlebars.render(this.rondasTemplate, {
                rondas: tipoTorneo.rondas,
                numeroDeSeries: tipoTorneo.numeroDeSeries,
                numeroDeFlechas: tipoTorneo.numeroDeFlechas
        });
        this.$element.find('.rondas-information').empty();
        this.$element.find('.rondas-information').html(rondasHtml);

        var self = this;
        for (var i = 0; i < tipoTorneo.rondas.length; i++) {
            this.$element.find('#foto_planilla-ronda-' + i).pekeUpload({
                onSubmit: false,
                theme: "bootstrap",
                multi: false,
                url: consts.BASE_API_URL + 'upload/foto-ronda/',
                onFileSuccess: $.proxy(function(i, file, data) {
                        self.$element.find('#foto-ronda-' + i).val(data.filename);
                    },
                    self, i)
            });
        }
    },

    /**
     * Se encarga de guarda toda la informacion del torneo y
     * de todas las rondas del mismo.
     */
    saveInformation: function(ev) {
        ev.stopPropagation();
        ev.preventDefault();

        var torneoData = this.$element.find('.torneo-information').serializeObject();
        var torneoId = '';
        if ('torneo_id' in torneoData) {
            torneoId = torneoData['torneo_id'];
        }
        var httpMethod = null;
        var url = 'torneo/';
        if (torneoId === '') {
            httpMethod = 'POST';
        } else {
            url += torneoId + '/';
            httpMethod = 'PUT';
        }

        var self = this;
        $.ajax({
            type: httpMethod,
            url: consts.BASE_API_URL + url,
            data: torneoData,
            success: function(responseData, text, jqXHR) {
                // TODO falta setear el input hidden con el id del torneo por si
                // hay algun error en la validacion de las rondas.

                // ahora me tengo que fijar todo el tema de la actualizacion de
                // las rondas del torneo.
                self.saveRonda(0, responseData.id);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // tengo que borrar todos los errores anteriores...
                utils.renderFormErrors(self.$element.find('.torneo-information'),
                                       jqXHR);
            }
        });
    },

    /**
     * Se encarga de mandarle al servidor toda la informacion para que se guarde
     * la ronda correspondiente.
     *
     * @param {int} numeroRonda: el numero de ronda que se tiene que intentar de
     *                           guardar.
     *
     * @param {int} idTorneo: el id del torneo al cual pertence esta ronda.
     */
    saveRonda: function(numeroRonda, idTorneo) {
        var rondaForm = this.$element.find('.ronda-' + numeroRonda + '-form');
        if (! rondaForm.exists()) {
            // en este caso se procesaron todas las series y todas las rondas
            // de la informacion del torneo. Por lo que tengo que avisarle
            // al view que se termino de guardar todo.
            this.crudView.createdObject(idTorneo);
            return;
        }

        // en caso de que exista, entonces tengo que enviar toda la informacion
        // al servidor. Necesito volver a habilitarlos porque sino, no me toma
        // la informacion de los mismos.
        var disabled = rondaForm.find(':input:disabled').removeAttr('disabled');
        var rondaData = rondaForm.serializeObject();
        disabled.attr('disabled', 'disabled');
        var rondaId = '';
        if (('id-ronda-' + numeroRonda) in rondaData) {
            rondaId = rondaData['id-ronda-' + numeroRonda];
        }


        var httpMethod = null;
        var rondaUrl = 'ronda/';
        if (rondaId === '') {
            httpMethod = 'POST';
        } else {
            url += rondaId + '/';
            httpMethod = 'PUT';
        }

        // tengo que cambiar todos los valores de los nombres de los
        // attributos porque los mismos terminan con ronda-{{ @index }}
        var finalRondaData = {};
        for (var attributeName in rondaData) {
            var value = rondaData[attributeName];
            finalRondaData[attributeName.replace('-ronda-' + numeroRonda, '')] = value;
        }
        finalRondaData.id_torneo = idTorneo;


        var self = this;
        $.ajax({
            type: httpMethod,
            url: consts.BASE_API_URL + rondaUrl,
            data: finalRondaData,
            success: function(responseData, textStatus, jqXHR) {
                self.guardarSerieRonda(numeroRonda, 0, true, responseData.id, idTorneo);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                utils.renderFormErrors(rondaForm, jqXHR);
            }
        });
    },

    /**
     * Guarda toda la informacion de una de las series de la ronda en caso de
     * que la misma tenga los valores.
     *
     * @param {int} numeroDeRonda: el numero de la ronda que se tiene que guardar.
     *
     * @param {int} numeroDeSerie: dentro de la serie, cual es el numero de la misma
     *                             que se tiene que guardar.
     *
     * @param {boolean} esDePractica: si es true, entonces se esta intentando de guardar
     *                                la informacion de las series de practica.
     *
     * @param {int} rondaId: el id de la ronda al cual pertencen las series que
     *                       se tienen que guardar.
     *
     * @param {int} torneoId: el id del torneo al cual pertence la ronda que se
     *                        tiene que guardar.
     */
    guardarSerieRonda: function(numeroRonda, numeroSerie, esDePractica, rondaId, torneoId) {
        var rondaForm = this.$element.find('.ronda-' + numeroRonda + '-form');
        var baseSelector = '#serie-' + numeroSerie + '-ronda-' + numeroRonda;
        if (esDePractica) {
            baseSelector += '-practica';
        }

        // me fijo si existe un elemeneto con esas descripciones.
        if (! rondaForm.find(baseSelector + '-puntaje-total').exists()) {
            if (esDePractica) {
                // si guarde toda la informacion de las series de practica entonces
                // ahora tengo que guardar toda la informacion de las series que
                // cuentan
                this.guardarSerieRonda(numeroRonda, 0, false, rondaId, torneoId);
            } else {
                // si guarde toda la informacion de las series, entonces tengo que
                // pasar a guardar la inforamcion de la siguiente ronda.
                this.saveRonda(numeroRonda + 1, torneoId);
            }
            return;
        }

        // me fijo si se tiene que guardar la informacion de la serie, basandonme
        // en si se tiene el valor de la ronda total
        var totalSerie = rondaForm.find(baseSelector + '-puntaje-total').val();
        if (totalSerie === '') {
            // como no ingreso un valor, entonces no tengo que guardar la informacion
            // de las series
            this.guardarSerieRonda(numeroRonda, numeroSerie + 1, esDePractica, rondaId, torneoId);
            return;
        }

        var serieData = {
            fue_de_practica: esDePractica,
            puntaje_total: totalSerie,
            id_ronda: rondaId
        };
        // ahora me encargo de guardar el puntaje de cada una de las series
        for (var i = 0; i < 6; i++) {
            var element = rondaForm.find(baseSelector + '-puntaje-flecha-' + i);
            if (! element.exists()){
                // en este caso ya guarde la informacion de todas las flechas
                break;
            }
            var puntaje = element.val();
            if (puntaje !== '') {
                serieData['puntaje_flecha_' + (i + 1)] = puntaje;
            }
        }

        var serieId = '';
        var httpMethod = null;
        var serieUrl = 'serie/';
        if (serieId === '') {
            httpMethod = 'POST';
        } else {
            url += serieId + '/';
            httpMethod = 'PUT';
        }

        var self = this;
        $.ajax({
            type: httpMethod,
            url: consts.BASE_API_URL + serieUrl,
            data: serieData,
            success: function(responseData, textStatus, jqXHR) {
                self.guardarSerieRonda(numeroRonda, numeroSerie + 1, esDePractica, rondaId, torneoId);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                utils.renderFormErrors(rondaForm, jqXHR);
            }
        });
    }

});


var TorneosCrudApplication = BaseCrudApp.$extend({

    __init__: function(historyManager, element) {
        var tableView = new TableView(element.find('.table-container'),
                                       'torneo',
                                       ['cuando','tipo_de_torneo', 'fue_practica', 'puntaje_final_torneo' ],
                                       historyManager);

        var formView = new TorneoFormView(element.find('.form-container'));
        var crudView = new CrudView(tableView, formView, historyManager);
        tableView.crudView = crudView;
        formView.crudView = crudView;
        this.$super(historyManager, crudView);
    }
});




