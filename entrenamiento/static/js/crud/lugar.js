/**
 * La applicacion que se encarga de todo el tema del CRUD
 * de lugares.
 */
var LugarApplication = BaseCrudApp.$extend({

    __init__: function(historyManager, element) {
        var formTemplate = '' +
            '<form role="form" class="form-horizontal">' +
                '<div class="form-group">' +
                    '<label for="nombre" class="col-sm-2 control-label">Nombre</label>' +
                    '<div class="col-sm-10">' +
                        '<input type="text" name="nombre" id="nombre" class="form-control">' +
                        '<span class="help-block">Un nombre que pueda distinguir este lugar</span>' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label for="latitud" class="col-sm-2 control-label">Latitud</label>' +
                    '<div class="col-sm-10">' +
                        '<input type="text" name="latitud" id="latitud" class="form-control">' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label for="longitud" class="col-sm-2 control-label">Longitud</label>' +
                    '<div class="col-sm-10">' +
                        '<input type="text" name="longitud" id="longitud" class="form-control">' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<div class="col-sm-10 col-sm-offset-2">' +
                        '<div class="checkbox">' +
                            '<label>' +
                                '<input type="checkbox" name="es_de_entrenamiento" id="es_de_entrenamiento">Es de entrenamiento' +
                            '</label>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<div class="col-sm-10 col-sm-offset-2">' +
                        '<button type="submit" class="btn btn-primary button-save">Grabar</button>' +
                    '</div>' +
                '</div>' +
            '</form>';
        var columnNames = [
            'nombre',
            'latitud',
            'longitud',
            'es_de_entrenamiento'
        ];
        this.$super(historyManager, 'lugar', formTemplate, element, columnNames);
    }
});



