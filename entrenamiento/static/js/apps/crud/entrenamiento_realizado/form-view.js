/**
 * La view que se encarga de renderar todo el form para que el usuario pueda editar
 * los valores correspondientes.
 */
var EntrenamientoRealizadoFormView = Class.$extend({

    __init__: function(element,
                       entrenamientoRealizadoColumnsInformation,
                       entrenamientoRealizadoFkInformation,
                       entrenamientoFlechasColumnsInformation,
                       entrenamientoFlechasFkInformation) {

        this.$element = element;
        this.entrenamientoRealizadoColumnsInformation = entrenamientoRealizadoColumnsInformation;
        this.entrenamientoRealizadoFkInformation = entrenamientoRealizadoFkInformation;
        this.entrenamientoFlechasColumnsInformation = entrenamientoFlechasColumnsInformation;
        this.entrenamientoFlechasFkInformation = entrenamientoFlechasFkInformation;

        var entrenamientoRealizadoSuperTemplate = '' +
                                                '<form role="form" class="form-horizontal">' +
                                                    '{{#each columnsNamesToShow}}' +
                                                        '{{renderFormField this ../columnsInformation ../fkInformation }}' +
                                                    '{{/each}}' +
                                                '</form>' +
                                                '<div class="flechas-information">' +
                                                '</div>' +
                                                '<div class="row">' +
                                                    '<div class="col-sm-offset-3">' +
                                                        '<a href="#" class="btn btn-primary add-flechas">Agregar flechas</a>' +
                                                        '<input type="submit" class="btn btn-primary button-save">' +
                                                    '</div>' +
                                                '</div>' ;

        this.entrenamientoRealizadoTemplate = Handlebars.render(entrenamientoRealizadoSuperTemplate, {
                        columnsInformation: this.entrenamientoRealizadoColumnsInformation,
                        fkInformation: this.entrenamientoRealizadoFkInformation,
                        columnsNamesToShow: [
                            new FieldsetFieldData('Informacion del dia', true),
                                new FormFieldData('cuando', null),
                            new FieldsetFieldData('Information del dia', false),
                        ]
        });


        var entrenamientoFlechasSuperTemplate = '' +
                '<form role="form" class="form-inline flechas-{{raw "[[ index ]]" }}-form" enctype="multipart/form-data">' +
                    '{{#each columnsNamesToShow}}' +
                        '{{renderFormFieldInline this ../columnsInformation ../fkInformation }}' +
                    '{{/each}}' +
                '</form>';

        this.entrenamientoFlechasTemplate = Handlebars.render(entrenamientoFlechasSuperTemplate, {
                                               columnsInformation: this.entrenamientoFlechasColumnsInformation,
                                               fkInformation: this.entrenamientoFlechasFkInformation,
                                               columnsNamesToShow: [
                                                    new FormFieldData('cantidad_de_flechas', null),
                                                    new FormFieldData('distancia', null),
                                                    new FormFieldData('hora_inicio', null),
                                                    new FormFieldData('id_arco', null),
                                                    new FormFieldData('id_lugar', null),
                                               ]
        });





    },

    /**
     * Se encarga de renderar todo el form para la informacion del toreno, sin tener
     * en cuenta la informacion de las rondas del mismo.
     */
    renderEntrenamientoRealizadoInformation: function(entrenamientoRealizadoObjectData, validationErrors) {
        this._renderTemplate(this.entrenamientoRealizadoTemplate,
                            entrenamientoRealizadoObjectData,
                            validationErrors,
                            this.entrenamientoRealizadoColumnsInformation,
                            this.$element,
                            null);
    },

    /**
     * Se encarga de mostrar toda la informacion de la ronda en cuestion
     */
    renderEntrenamientoFlechasInformation: function(entrenamientoFlechasObjectData, validationErrors, index) {
       this.$element.find('.flechas-information').append('<div class="flechas-' + index + '-div flechas-div"></div>');
       this._renderTemplate(this.entrenamientoFlechasTemplate,
                            entrenamientoFlechasObjectData,
                            validationErrors,
                            this.entrenamientoFlechasColumnsInformation,
                            this.$element.find('.flechas-' + index + '-div'),
                            index);

    },

    /**
     * Se encarga de agregar un nuevo lugar para que el usuario pueda cargar toda la informacion
     * sobre el entrenamiento de las flechas que hizo ese dia.
     */
    addEntrenamientoFlechas: function() {
        // tengo que buscar el indice hasta ver cual le corresponde al mismo
        var currentIndex = 0;
        while (this.$element.find('.flechas-' + currentIndex + '-div').exists()) {
            currentIndex += 1;
        }

       this.$element.find('.flechas-information').append('<div class="flechas-' + currentIndex + '-div flechas-div"></div>');
       this._renderTemplate(this.entrenamientoFlechasTemplate,
                            null,
                            null,
                            this.entrenamientoFlechasColumnsInformation,
                            this.$element.find('.flechas-' + currentIndex + '-div'),
                            currentIndex);

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

        utils.applyJavascriptPluginsToForm(columnsInformation, element);

        if (objectData !== null) {
            utils.renderFormData(element,
                                 objectData,
                                 '');
        }
        element.unmask();
    }
})
