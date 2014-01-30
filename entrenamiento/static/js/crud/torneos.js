var TorneoFormView = BaseFormView.$extend({

    __init__: function(element) {
        this.$super(element);

        this.serieTemplate = '' +
            '{{#ifCond numeroSerie "===" 1 }}' +
                '<tr>' +
                    '<th>Fue de practica?</th>' +
                    '{{#each cantidadFlechas }}' +
                        '<th>Puntaje flecha {{ this }}</th>' +
                    '{{/each}}' +
                    '<th>Puntaje total</th>' +
                '</tr>' +
            '{{/ifCond}}' +
            '<tr>' +
                '<td>' +
                    '{{#ifCond numeroSerie "<=" 3 }}' +
                        '<input type="checkbox" name="fue-de-practica-serie-{{ numeroSerie}}" id="fue-de-practica-serie-{{ numeroSerie }}">' +
                    '{{/ifCond}}' +
                '</td>' +
                '{{#each cantidadFlechas }}'+
                    '<td>' +
                        '<input type="text" name="puntaje-flecha-{{ this }}-serie-{{../numeroSerie}}" id="puntaje-flecha-{{ this }}-serie-{{ ../numeroSerie }}">' +
                    '</td>' +
                '{{/each }}' +
                '<td>' +
                    '<input type="text" name="puntaje-total-serie-{{numeroSerie}}" id="puntaje-total-serie-{{ numeroSerie }}">' +
                '</td>' +
            '</tr>';


        this.rondaTemplate = '' +
            '<formset>' +
                '<h3>Ronda {{ numeroRonda }}</h3>' +
                '<div class="form-group">' +
                    '<label for="distancia-ronda-{{ numeroRonda }}">Distancia</label>' +
                    '<div class="col-sm-10">' +
                        '<select name="distancia-ronda-{{ numeroRonda }}">' +
                            '<option value="18">18</option>' +
                            '<option value="20">20</option>' +
                            '<option value="30">30</option>' +
                            '<option value="50">50</option>' +
                            '<option value="60">60</option>' +
                            '<option value="70">70</option>' +
                            '<option value="90">90</option>' +
                        '</select>' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label for="puntaje-ronda-{{ numeroRonda }}">Puntaje final</label>' +
                    '<div class="col-sm-10">' +
                        '<input type="text" name="puntaje-ronda-{{ numeroDeRonda }}" id="puntaje-ronda-{{ numeroDeRonda }}"/>' +
                        '<span class="help-block">El puntaje que hiciste en esta ronda sin tener en cuenta las series de practica</span>' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label for="foto-planilla-ronda-{{ numeroRonda }}">Foto planilla</label>' +
                    '<div class="clo-sm-10">' +
                        '<input type="file" name="foto-planilla-ronda-{{ numeroRonda }}" id="foto-planilla-ronda-{{ numeroRonda }}" />' +
                    '</div>' +
                '</div>' +
                '<table class="table puntajes-serie">' +
                '</table>' +
            '</formset>' ;

        this.torneoTemplate = '' +
            '<form role="form" class="form-horizontal">' +
                '<formset>' +
                    '<h3>Informacion del torneo</h3>' +
                    '<div class="checkbox">'
                        '<label>' +
                            '<input type="checkbox" name="fue-practica" id="fue-practica" />Fue de practica?</label>' +
                            '<span class="help-block">Tenes que tildar esta opcion si el mismo fue en el maldonado en el campo de olivos</span>' +
                        '</label>' +
                    '</div>' +
                    '<div class="form-group">'
                        '<label for="cuando">Cuando'
                        '<div class="col-sm-10">' +
                            '<input type="text" name="cuando" id="cuando">' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">'+
                        '<label for="tipo_de_torneo">Tipo de torneo</label>' +
                        '<div class="col-sm-10">' +
                            '<select name="tipo_de_toneo" id="tipo_de_toneo">' +
                                '<optgroup label="Indoor">' +
                                    '<option value="18">18m</option>' +
                                    '<option value="25">25m</option>' +
                                '</optgroup>' +
                                '<optgroup label="Outdoor 1440">' +
                                    '<option value="90-70-50-30">90-70-50-30</option>' +
                                    '<option value="70-60-50-30">70-60-50-30</option>' +
                                    '<option value="50-50-30-30">50-50-30-30</option>' +
                                    '<option value="30-30-20-20">30-30-20-20</option>' +
                                '</optgroup>' +
                                '<optgroup label="Outdoor 70-70">' +
                                    '<option value="70-70">70-70</option>' +
                                    '<option value="60-60">60-60</option>' +
                                    '<option value="50-50">50-50</option>' +
                                    '<option value="30-30">30-30</option>' +
                                    '<option value="20-20">20-20</option>' +
                                '</optgroup>' +
                            '</select>' +
                        '</div>'
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="puntaje_final">Puntaje</label>' +
                        '<div class="col-sm-10">' +
                            '<input type="text" name="puntaje_final" id="puntaje_final">' +
                            '<span class="help-block">El puntaje final hecho teniendo en cuenta todas las series</span>' +
                        '</div>'+
                    '</div>'+
                    '<div class="form-group">' +
                        '<label for="lugar">Donde fue el torneo?</label>' +
                        '<div class="col-sm-10">' +
                            '<select name="lugar" id="lugar">'  +
                                '{{#each lugares}}' +
                                    '<option value="{{ this.id }}">{{ this.nombre }}</option>' +
                                '{{/each}}'+
                            '</select>' +
                        '</div>' +
                    '</div>' +
                '</formset>' +
            '</form>';

    }

    renderForm: function() {
        this.$super();

    }
});




var TorneoApplication = Base.$extend({
})
