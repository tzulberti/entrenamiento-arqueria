/**
 * Form especial para ver cargar toda la informacion de los torneos.
 *
 * A diferencia de otros modelos, se necesita hacer uno custom porque:
 *
 * - el mismo renderea varios forms
 * - dependiendo de lo que el usuario elija, se renderan ciertos forms o no.
 */
var TorneoFormView = BaseFormView.$extend({

    __init__: function(element) {
        this.$super(element);

        this.objectId = null;

        this.rondasTemplate = '' +
            '{{#each rondas }}' +
                '<form role="form" class="form-horizontal ronda-{{ @index }}-form" enctype="multipart/form-data">' +
                    '<input type="hidden" name="ronda-{{ @index }}-id" id="id-ronda-{{ @index }}"></input>' +
                    '<input type="hidden" name="foto-ronda-{{ @index }}" id="foto-ronda-{{ @index }}"></input>' +
                    '{{setIndex "indexRonda" @index}}' +
                    '<formset>' +
                        '<h3>Ronda {{ @index }}</h3>' +
                        '<div class="form-group">' +
                            '<label for="ronda-{{ @index }}-distancia" class="col-sm-2 control-label">Distancia</label>' +
                            '<div class="col-sm-10">' +
                                '<input type="text" name="ronda-{{ @index }}-distancia" class="form-control" disabled value="{{ this.distancia }}">'+
                            '</div>' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="ronda-{{ @index }}-puntaje" class="col-sm-2 control-label">Puntaje final</label>' +
                            '<div class="col-sm-10">' +
                                '<input type="text" name="ronda-{{ @index }}-puntaje" id="ronda-{{ @index }}-puntaje" class="form-control"/>' +
                                '<span class="help-block">El puntaje que hiciste en esta ronda sin tener en cuenta las series de practica</span>' +
                            '</div>' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="ronda-{{ @index }}-foto_planilla" class="col-sm-2 control-label">Foto planilla</label>' +
                            '<div class="col-sm-10">' +
                                '<input type="file" name="ronda-{{ @index }}-foto_planilla" id="ronda-{{ @index }}-foto_planilla" class="form-control" />' +
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
                                        '<input type="checkbox" name="serie-{{ indexSeriePractica }}-ronda-{{ ../indexRonda }}-practica-fue_de_practica" id="serie-{{ indexSeriePractica }}-ronda-{{ ../indexRonda }}-practica-fue_de_practica" checked disabled>' +
                                    '</td>' +
                                    '{{#rangeEach ../../numeroDeFlechas }}'+
                                        '<td>' +
                                            '<input type="text" name="serie-{{ ../indexSeriePractica }}-ronda-{{ ../../indexRonda }}-practica-puntaje_flecha_{{math @index "+" 1}}" id="serie-{{ ../indexSeriePractica }}-ronda-{{ ../../indexRonda }}-practica-puntaje_flecha_{{math @index "+" 1}}">' +
                                        '</td>' +
                                    '{{/rangeEach }}' +
                                    '<td>' +
                                        '<input type="text" name="serie-{{ indexSeriePractica }}-ronda-{{ ../indexRonda }}-practica-puntaje_total" id="serie-{{ indexSeriePractica }}-ronda-{{ ../indexRonda }}-practica-puntaje_total">' +
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
                                        '<input type="checkbox" name="serie-{{ indexSerie }}-ronda-{{ ../indexRonda }}-fue_de_practica" id="serie-{{ indexSerie }}-ronda-{{ ../indexRonda }}-fue_de_practica" disabled>' +
                                    '</td>' +
                                    '{{#rangeEach ../../numeroDeFlechas }}'+
                                        '<td>' +
                                            '<input type="text" name="serie-{{ ../indexSerie }}-ronda-{{ ../../indexRonda }}-puntaje_flecha_{{math @index "+" 1}}" id="serie-{{ ../indexSerie }}-ronda-{{ ../../indexRonda }}-puntaje_flecha_{{math @index "+" 1}}">' +
                                        '</td>' +
                                    '{{/rangeEach }}' +
                                    '<td>' +
                                        '<input type="text" name="serie-{{ indexSerie }}-ronda-{{ ../indexRonda }}-puntaje_total" id="serie-{{ indexSerie }}-ronda-{{ ../indexRonda }}-puntaje_total">' +
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
                    '<input type="hidden" name="id" id="id"></input>' +
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
                    '<div class="form-group">' +
                        '<label for="comentario" class="col-sm-2 control-label">Comentario</label>' +
                        '<div class="col-sm-10">' +
                            '<textarea name="comentario" id="comentario" class="form-control"></textarea>' +
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
                    '<div class="form-group">'+
                        '<label for="id_arco" class="col-sm-2 control-label">Arco</label>' +
                        '<div class="col-sm-10">' +
                            '<select name="id_arco" id="id_arco" class="form-control">' +
                                '<option value=""></option>' +
                                '{{#each arcos}}' +
                                    '<option value="{{ this.id }}">{{ this.nombre }}</option>' +
                                '{{/each}}'+
                            '</select>' +
                        '</div>'+
                    '</div>' +
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
     * Se encarga de obtener toda la informacion para poder renderar
     * el torneo y todas las series del mismo.
     *
     * @param {int} objectId: el id del objeto que el usuario quiere editar.
     */
    editObject: function(objectId) {
        this.objectId = objectId;
        this.renderBaseHtml();
    },

    /**
     * Se encarga de buscar toda la informacion sobre los diferentes lugares en los que
     * el usuario puede haber tirado un toreneo.
     *
     * Cuando llegue la respuesta de eso, se encarga de renderar el form.
     */
    renderBaseHtml: function() {
        var self = this;
        this.lugaresData = [];
        this.arcosData = [];
        this.missingCallbacks = [true, true];

        $.ajax({
            type: 'GET',
            url: '/api/v01/lugar/',
            success: function(data, textStatus, jqXHR) {
                self.missingCallbacks[0] = false;
                self.lugaresData = data.values;
                self.renderInformation(data);
            }
        });
        $.ajax({
            type: 'GET',
            url: '/api/v01/arco/',
            success: function(data, textStatus, jqXHR) {
                self.missingCallbacks[1] = false;
                self.arcosData = data.values;
                self.renderInformation();
            }
        });
    },


    /**
     * Callback de cuando se hace el llamadao para obtener la informacion de los
     * lugares en donde se puede haber hecho el torneo.
     *
     * El mismo se va a ocupar de renderar el html.
     */
    renderInformation: function() {
        // me fijo si me falta obtener la informacion de algun callback para
        // poder renderar toda la informacion
        var canContinue = true;
        for (var i = 0; i < this.missingCallbacks.length; i++) {
            if (this.missingCallbacks[i]) {
                canContinue = false;
                break;
            }
        }
        if (! canContinue) {
            return;
        }
        var html = Handlebars.render(this.torneoTemplate, {
            lugares: this.lugaresData,
            arcos: this.arcosData,
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
        this.$element.find('textarea').cleditor({
            controls: "bold italic underline | " +
                      "font size | "  +
                      "color highlight | " +
                      "alignleft center alignright justify | " +
                      "bullets numbering"
        });

        if (this.objectId === null) {
            // sino esta editando la informacion de un torneo entonces no tengo
            // nada mas que hacer
            return;
        }

        // si esta editando un objeto en cuestion, entonces tengo que hacer
        // los llamados ajax para obtener la informacion de las rondas
        // y series del mismo.
        this.missingDataCallbacks = [true, true, true];
        var self = this;
        $.ajax({
            type: 'GET',
            url: '/api/v01/torneo/' + this.objectId + '/' ,
            success: function(data, textStatus, jqXHR) {
                self.torneoData = data;
                self.missingDataCallbacks[0] = false;
                self.renderTorneoData();
            }
        });

        // tambien busco la informacion de las ronda para ese torneo
        $.ajax({
            type: 'GET',
            url: '/api/v01/ronda/',
            data: {
                'f-0': 'ronda;id_torneo;eq;' + self.objectId,
                'orderBy': 'id'

            },
            success: function(data, textStatus, jqXHR) {
                self.missingDataCallbacks[1] = false;
                self.rondasData = data.values;

                // ahora, para cada una de esas series, tengo que obtener la informacion
                var ids = [];
                for (var i = 0; i < self.rondasData.length; i++) {
                    ids.push(self.rondasData[i].id);
                }

                $.ajax({
                    type: 'GET',
                    url: '/api/v01/serie/',
                    data: {
                        'f-0': 'serie;id_ronda;in;' + ids,
                        'orderBy': 'id'
                    },
                    success: function(data, textStatus, jqXHR) {
                        self.seriesData = data.values;
                        self.missingDataCallbacks[2] = false;
                        self.renderTorneoData();
                    }
                });
            }
        });
    },

    /**
     * Una vez que se obtuvo toda la informacion del torneo, se encarga de renderar
     * la misma.
     */
    renderTorneoData: function() {
        // antes de renderar la informacion me tengo que asegurar de
        // no tener ningun callback pendiente
        var canContinue = true;
        for (var i = 0; i < this.missingDataCallbacks.length; i++) {
            if (this.missingDataCallbacks[i]) {
                canContinue = false;
                break;
            }
        }

        if (! canContinue) {
            return;
        }

        // primero rendero la informacion del torneo
        utils.renderFormData(this.$element,
                             this.torneoData,
                             '');

        // ahora me fijo de renderar toda la informacion de las ronda
        for (var i = 0; i < this.rondasData.length; i++) {
            var rondaForm = this.$element.find('.ronda-' + i + '-form');
            utils.renderFormData(rondaForm,
                                 this.rondasData[i],
                                 'ronda-' + i );
            // ahora tengo que buscar todas las series que pertenzcan a esta
            // ronda y renderar la informacion de las mismas
            var indexSerie = 0;
            var indexPractica = 0;
            for (var j = 0; j < this.seriesData.length; j++) {
                if (this.seriesData[j].id_ronda === this.rondasData[i].id) {
                    var indexValue = indexSerie;
                    var practicaPrefix = '';
                    if (this.seriesData[j].fue_de_practica) {
                        practicaPrefix += '-practica';
                        indexValue = indexPractica;
                        indexPractica += 1;
                    } else {
                        indexSerie += 1;
                    }
                    var prefix = 'serie-' + indexValue + '-ronda-' + i + practicaPrefix;
                    utils.renderFormData(rondaForm,
                                         this.seriesData[j],
                                         prefix);
                }
            }
        }
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
        if ('id' in torneoData) {
            torneoId = torneoData['id'];
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
        if (('ronda-' + numeroRonda + '-id') in rondaData) {
            rondaId = rondaData['ronda-' + numeroRonda + '-id'];
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
            finalRondaData[attributeName.replace('ronda-' + numeroRonda + '-', '')] = value;
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
        for (var i = 1; i <= 6; i++) {
            var element = rondaForm.find(baseSelector + '-puntaje-flecha-' + i);
            if (! element.exists()){
                // en este caso ya guarde la informacion de todas las flechas
                break;
            }
            var puntaje = element.val();
            if (puntaje !== '') {
                serieData['puntaje_flecha_' + i] = puntaje;
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
        this.historyManager.addApplicationForModel('torneo', this);
    }
});




