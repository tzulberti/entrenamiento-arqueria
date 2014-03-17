/**
 * La applicacion que se encarga de todo el tema del CRUD
 * de lugares.
 */
var PagoCrudApplication = BaseTemplateCrudApp.$extend({

    __init__: function(historyManager, element) {
        var formTemplate = '' +
            '<form role="form" class="form-horizontal">' +
                '<div class="form-group">' +
                    '<label for="cuando" class="col-sm-2 control-label">Cuando</label>' +
                    '<div class="col-sm-10">' +
                        '<input type="text" name="cuando" id="cuando" class="form-control">' +
                        '<span class="help-block">La fecha al cual corresponde el pago que hizo el arquero</span>' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label for="mes_correspondiente" class="col-sm-2 control-label">Mes correspondiente</label>' +
                    '<div class="col-sm-10">' +
                        '<input type="text" name="mes_correspondiente" id="mes_correspondiente" class="form-control">' +
                        '<span class="help-block">La fecha del mes al cual corresponde el pago</span>' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label for="importe" class="col-sm-2 control-label">Importe</label>' +
                    '<div class="col-sm-10">' +
                        '<input type="text" name="importe" id="importe" class="form-control">' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label for="razon" class="col-sm-2 control-label">Razon</label>' +
                    '<div class="col-sm-10">' +
                        '<select name="razon" id="razon">' +
                            '<option value="Cuota-Eda">Cuota EDA</option>' +
                            '<option value="Cuota-Fatarco">Cuota Fatarco</option>' +
                            '<option value="Inscripcion-Torneo">Inscripcion Torneo</option>' +
                        '</select>' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<div class="col-sm-10 col-sm-offset-2">' +
                        '<button type="submit" class="btn btn-primary button-save">Grabar</button>' +
                    '</div>' +
                '</div>' +
            '</form>';
        var columnNames = [
            'cuando',
            'importe',
            'razon'
        ];
        this.$super(historyManager, 'pago', formTemplate, element, columnNames);
    }
});

