/**
 * La applicacion que se encarga de todo el tema del CRUD
 * de lugares.
 */
var LugarApplication = Class.$extend({

    __init__: function(element) {
        this.$element = element;
    },


    start: function() {
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
                        '</div>'
                    '</div>' +
                '</div>' +
            '</form>';

        this.tableView = new TableView(this.$element.find('.table-container'),
                                       'lugar');
        this.formView = new FormView(this.$element.find('.form-container'),
                                     formTemplate,
                                     'lugar',
                                     null);
        this.crudView = new CrudView(this.tableView, this.formView);
        this.crudView.render();
    }
});

var app = LugarApplication($('.container'));
app.start();
