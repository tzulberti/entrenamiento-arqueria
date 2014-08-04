/**
 * La view que se encarga de renderar todo el form para que el usuario pueda editar
 * los valores correspondientes.
 */
var TorneoFormView = Class.$extend({

    __init__: function(element, torneoColumnsInformation, torneoFkInformation,
                       rondaColumnsInformation, rondasFkInformation) {
        this.$element = element;
        this.torneoColumnsInformation = torneoColumnsInformation;
        this.torneoFkInformation = torneoFkInformation;
        this.rondaColumnsInformation = rondaColumnsInformation;
        this.rondasFkInformation = rondasFkInformation;

        this.torneosSuperTemplate = '' +
            '<form role="form" class="form-horizontal">' +
                '{{#each columnsNamesToShow}}' +
                    '{{renderFormField this ../columnsInformation ../fkInformation }}' +
                '{{/each}}' +
                '<div class="rondas-information">' +
                '</div>' +
                '<div class="row">' +
                    '<div class="col-sm-offset-3">' +
                        '<input type="submit" class="btn btn-primary button-save">' +
                    '</div>' +
                '</div>' +
            '</form>';

    },

    /**
     * Se encarga de renderar todo el form para la informacion del toreno, sin tener
     * en cuenta la informacion de las rondas del mismo.
     */
    renderTorneoInformation: function(torneoObjectData, validationErrors) {
        var template = Handlebars.render(this.torneosSuperTemplate, {
                        columnsInformation: this.torneoColumnsInformation,
                        fkInformation: this.torneoFkInformation,
                        columnsNamesToShow: [
                            new FieldsetFieldData('Informacion del torneo', true),
                                new FormFieldData('fue_practica', null),
                                new FormFieldData('cuando', null),
                                new FormFieldData('comentario', null),
                                new FormFieldData('id_tipo_de_torneo', null),
                                new FormFieldData('puntaje_final_torneo', null),
                                new FormFieldData('id_arco', null),
                                new FormFieldData('id_lugar', null),
                            new FieldsetFieldData('Information del torneo', false),
                        ]
        });
        this.renderTemplate(template,
                            torneoObjectData,
                            validationErrors,
                            this.torneoColumnsInformation,
                            null);
    },

    renderTemplate: function(template, objectData, validationErrors, columnsInformation, index) {
        var html = Handlebars.render(template, {
                        validationErrors: validationErrors
        });

        this.$element.clean();
        this.$element.html(html);

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
                formField = this.$element.find('#' + columnInformation.databaseName)
            } else {
                formField = this.$element.find('#' + columnInformation.databaseName + '-' + index);
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
        this.$element.find('textarea').cleditor({
                controls: "bold italic underline | " +
                          "font size | "  +
                          "color highlight | " +
                          "alignleft center alignright justify | " +
                          "bullets numbering"
        });


        if (objectData !== null) {
            utils.renderFormData(this.$element,
                                 objectData,
                                 '');
        }
        this.$element.unmask();
    }
})
