var TorneoFormView = BaseFormView.$extend({

    __init__: function(element) {
        this.$super(element);

        this.rondasTemplate = '' +
            '{{#each rondas }}' +
                '{{setIndex "indexRonda" @index}}' +
                '<formset>' +
                    '<h3>Ronda {{ @index }}</h3>' +
                    '<div class="form-group">' +
                        '<label for="distancia-ronda-{{@index }}" class="col-sm-2 control-label">Distancia</label>' +
                        '<div class="col-sm-10">' +
                            '<input type="text" name="distancia-ronda-{{@index}}" class="form-control" disabled value="{{ this.distancia }}">'+
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="puntaje-ronda-{{@index }}" class="col-sm-2 control-label">Puntaje final</label>' +
                        '<div class="col-sm-10">' +
                            '<input type="text" name="puntaje-ronda-{{ @index }}" id="puntaje-ronda-{{ @index }}" class="form-control"/>' +
                            '<span class="help-block">El puntaje que hiciste en esta ronda sin tener en cuenta las series de practica</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="foto-planilla-ronda-{{ @index }}" class="col-sm-2 control-label">Foto planilla</label>' +
                        '<div class="col-sm-10">' +
                            '<input type="file" name="foto-planilla-ronda-{{ @index }}" id="foto-planilla-ronda-{{ @index }}" class="form-control" />' +
                        '</div>' +
                    '</div>' +
                    '<table class="table puntajes-serie">' +
                        '<tr>' +
                            '<th>Numero de serie</th>' +
                            '<th>Fue de practica?</th>' +
                            '{{#rangeEach ../numeroDeFlechas }}' +
                                '<th>Puntaje flecha {{ this }}</th>' +
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
                                    '<input type="checkbox" name="fue-de-practica-serie-{{ indexSeriePractica }}-ronda-{{ ../indexRonda }}" id="fue-de-practica-serie-{{ indexSeriePractica }}-ronda-{{ ../indexRonda }}" checked disabled>' +
                                '</td>' +
                                '{{#rangeEach ../../numeroDeFlechas }}'+
                                    '<td>' +
                                        '<input type="text" name="puntaje-flecha-{{ @index }}-serie-{{ ../indexSeriePractica }}-ronda-{{ ../../indexRonda }}" id="puntaje-flecha-{{ @index }}-serie-{{ ../indexSeriePractica }}-ronda-{{ ../../indexRonda }}">' +
                                    '</td>' +
                                '{{/rangeEach }}' +
                                '<td>' +
                                    '<input type="text" name="puntaje-total-serie-{{ indexSeriePractica }}-ronda-{{ ../indexRonda }}" id="puntaje-total-serie-{{ indexSeriePractica }}-ronda-{{ ../indexRonda }}">' +
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
                                    '<input type="checkbox" name="fue-de-practica-serie-{{ indexSerie }}-ronda-{{ ../indexRonda }}" id="fue-de-practica-serie-{{ indexSerie }}-ronda-{{ ../indexRonda }}" disabled>' +
                                '</td>' +
                                '{{#rangeEach ../../numeroDeFlechas }}'+
                                    '<td>' +
                                        '<input type="text" name="puntaje-flecha-{{ @index }}-serie-{{ ../indexSerie }}-ronda-{{ ../../indexRonda }}" id="puntaje-flecha-{{ @index }}-serie-{{ ../indexSerie }}-ronda-{{ ../../indexRonda }}">' +
                                    '</td>' +
                                '{{/rangeEach }}' +
                                '<td>' +
                                    '<input type="text" name="puntaje-total-serie-{{ indexSerie }}-ronda-{{ ../indexRonda }}" id="puntaje-total-serie-{{ indexSerie }}-ronda-{{ ../indexRonda }}">' +
                                '</td>' +
                            '</tr>' +
                         '{{/rangeEach}}' +
                    '</table>' +
                '</formset>' +
            '{{/each}}';

        this.torneoTemplate = '' +
            '<form role="form" class="form-horizontal">' +
                '<formset>' +
                    '<h3>Informacion del torneo</h3>' +
                    '<div class="checkbox">' +
                        '<label>' +
                            '<input type="checkbox" name="fue-practica" id="fue-practica" />Fue de practica?</label>' +
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
                        '<label for="puntaje_final" class="col-sm-2 control-label">Puntaje</label>' +
                        '<div class="col-sm-10">' +
                            '<input type="text" name="puntaje_final" id="puntaje_final" class="form-control">' +
                            '<span class="help-block">El puntaje final hecho teniendo en cuenta todas las series</span>' +
                        '</div>'+
                    '</div>'+
                    '<div class="form-group">' +
                        '<label for="lugar" class="col-sm-2 control-label">Donde fue el torneo?</label>' +
                        '<div class="col-sm-10">' +
                            '<select name="lugar" id="lugar" class="form-control">'  +
                                '{{#each lugares}}' +
                                    '<option value="{{ this.id }}">{{ this.nombre }}</option>' +
                                '{{/each}}'+
                            '</select>' +
                        '</div>' +
                    '</div>' +
                '</formset>' +
                '<div class="rondas-information">' +
                '</div>' +
            '</form>';
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
        this.$element.html(html);

        this.$element.off('change', '#tipo_de_torneo');
        this.$element.on('change', '#tipo_de_torneo', $.proxy(this.changedTorneoType, this));
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
    }

});


var TorneosCrudApplication = BaseCrudApp.$extend({

    __init__: function(historyManager, element) {
        var tableView = new TableView(element.find('.table-container'),
                                       'torneo',
                                       ['cuando','tipo_de_torneo', 'fue_de_practica', 'puntaje_final_torneo' ],
                                       historyManager);

        var formView = new TorneoFormView(element.find('.form-container'));
        var crudView = new CrudView(tableView, formView, historyManager);
        tableView.crudView = crudView;
        formView.crudView = crudView;
        this.$super(historyManager, crudView);
    }
});




