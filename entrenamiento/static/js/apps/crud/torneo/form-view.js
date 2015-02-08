/**
 * La view que se encarga de renderar todo el form para que el usuario pueda editar
 * los valores correspondientes.
 */
var TorneoFormView = Class.$extend({

    __init__: function(element, torneoColumnsInformation, torneoFkInformation,
                       rondaColumnsInformation, rondaFkInformation) {
        this.$element = element;
        this.torneoColumnsInformation = torneoColumnsInformation;
        this.torneoFkInformation = torneoFkInformation;
        this.rondaColumnsInformation = rondaColumnsInformation;
        this.rondaFkInformation = rondaFkInformation;

        var torneosSuperTemplate = '' +
            '<form role="form" class="form-horizontal">' +
                '{{#each columnsNamesToShow}}' +
                    '{{renderFormField this ../columnsInformation ../fkInformation }}' +
                '{{/each}}' +
            '</form>' +
            '<div class="rondas-information">' +
            '</div>' +
            '<div class="row">' +
                '<div class="col-sm-offset-3">' +
                    '<input type="submit" class="btn btn-primary button-save">' +
                '</div>' +
            '</div>' ;

        this.torneoTemplate = Handlebars.render(torneosSuperTemplate, {
                        columnsInformation: this.torneoColumnsInformation,
                        fkInformation: this.torneoFkInformation,
                        columnsNamesToShow: [
                            new FieldsetFieldData('Informacion del torneo', true),
                                new FormFieldData('fue_practica', 'Si fue de practica el torneo (generalmente en el campode olivos o en Justo)'),
                                new FormFieldData('cuando', null),
                                new FormFieldData('posicion_classificacion', 'La posicion en la que terminaste despues de haber tirado las dos o cuatro rondas del torneo'),
                                new FormFieldData('posicion_eliminatoria', 'Si subiste al podio, la posicion en la que subiste. Sino deja esto en blanco'),
                                new FormFieldData('id_lugar', null),
                                new FormFieldData('comentario', null),
                                new FormFieldData('id_tipo_de_torneo', null),
                                new FormFieldData('puntaje_final_torneo', 'El puntaje sumado de todas las rondas del torneo'),
                                new FormFieldData('id_arco', 'El arco con el que tiraste'),
                                new FormFieldData('id_lugar', null),
                            new FieldsetFieldData('Information del torneo', false),
                        ]
        });


        var rondaSuperTemplate = '' +
                '<form role="form" class="form-horizontal ronda-{{raw "[[ index ]]" }}-form" enctype="multipart/form-data">' +
                    '<input type="hidden" name="ronda-{{raw "[[ index ]]" }}-id" id="id-ronda-{{raw "[[ index ]]" }}"></input>' +
                    '<formset>' +
                        '<h3>Ronda {{raw "[[ index ]]" }}</h3>' +
                        '{{#each columnsNamesToShow}}' +
                            '{{renderFormField this ../columnsInformation ../fkInformation }}' +
                        '{{/each}}' +
                    '</formset>' +
                '</form>';

        this.rondaTemplate = Handlebars.render(rondaSuperTemplate, {
                                               columnsInformation: this.rondaColumnsInformation,
                                               fkInformation: this.rondaFkInformation,
                                               columnsNamesToShow: [
                                                    new FormFieldData('puntaje', 'El puntaje que se hizo en esta ronda'),
                                                    new FormFieldData('distancia', 'La distancia a la que se tiro en esta ronda'),
                                                    new FormFieldData('foto_path', 'La foto de la planilla del ronda'),
                                               ]
        });





    },

    /**
     * Se encarga de renderar todo el form para la informacion del toreno, sin tener
     * en cuenta la informacion de las rondas del mismo.
     */
    renderTorneoInformation: function(torneoObjectData, validationErrors) {
        this._renderTemplate(this.torneoTemplate,
                            torneoObjectData,
                            validationErrors,
                            this.torneoColumnsInformation,
                            this.$element,
                            null);
    },

    /**
     * Se encarga de mostrar toda la informacion de la ronda en cuestion
     */
    renderRondaInformation: function(rondaObjectData, validationErrors, index) {
       this.$element.find('.rondas-information').append('<div class="ronda-' + index + '-div"></div>');
       this._renderTemplate(this.rondaTemplate,
                            rondaObjectData,
                            validationErrors,
                            this.rondaColumnsInformation,
                            this.$element.find('.ronda-' + index + '-div'),
                            index);

    },

    /**
     * Se encarga de renderar el template, y meterlo en el lugar correspondiente.
     */
    _renderTemplate: function(template, objectData, validationErrors, columnsInformation,
                             element, index) {
        var html = Handlebars.render(template, {
                        validationErrors: validationErrors,
                        index: index
        });

        element.clean();
        element.html(html);

        if (validationErrors) {
            new PNotify({
                title: 'Error',
                text: 'Alguno de los campos ingresados esta mal',
                delay: 1500,
                type: 'error'
            });

        }

        for (var i = 0; i < columnsInformation.length; i++) {
            var columnInformation = columnsInformation[i];
            var formField = null;
            if (index === null) {
                formField = element.find('#' + columnInformation.databaseName)
            } else {
                formField = element.find('#' + columnInformation.databaseName + '-' + index);
            }

            if (! formField.exists()) {
                // en este caso estoy en una columna que esta en la base de datos
                // pero que no la estoy renderando
                continue;
            }

            if (columnInformation.type === 'date') {
                formField.datepicker({
                    format: 'dd/mm/yyyy'
                });
            } else if (columnInformation.type === 'time') {
                formField.timepicker({
                    showSeconds: false,
                    minuteStep: 1,
                    showMeridian: false
                });
            } else if (columnInformation.isConst()) {
                formField.chosen({width: '300px'});
            } else if (columnInformation.foreignKey !== null) {
                formField.chosen({width: '300px'});
            }
        }

        // esto lo tengo que hacer aca porque sino no puedo distinguir entre
        // los textos comunes y los textare
        element.find('textarea').cleditor({
                controls: "bold italic underline | " +
                          "font size | "  +
                          "color highlight | " +
                          "alignleft center alignright justify | " +
                          "bullets numbering"
        });


        if (objectData !== null) {
            utils.renderFormData(element,
                                 objectData,
                                 '');
        }
        element.unmask();
    }
})
