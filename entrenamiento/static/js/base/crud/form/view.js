/**
 * Se encarga de renderar el form en cuestion teniendo en cuenta el template
 * que se tiene que usar y el elemento en donde tiene que ir el mismo.
 *
 * Este form es el que se usa para crear o editar diferentes valores de la
 * base de datos.
 */
var FormView = Class.$extend({

    /**
     * Constructor.
     *
     * @param {jQuery} element: el elemento del DOM en donde es que se va a
     *                          poner el form
     *
     *
     * @param {String} template: el template de handlebars que se tiene que
     *                           renderar.
     *
     * @param {Array(ColumnsInformation)} columnsInformation: todas las
     *                           columnas de la tabla (se tengan que renderear
     *                           o no.
     *
     * @param {FkInformation} fkInformation: tiene toda la informacion de las
     *                                       tablas relacionadas.
     */
    __init__: function(element, template, columnsInformation, fkInformation) {
        this.$element = element;
        this.template = template;
        this.columnsInformation = columnsInformation;
        this.fkInformation = fkInformation;
    },


    /**
     * Se encarga de renderear el form teniendo en cuenta los valores especificados,
     * y los posibles errores de validacion.
     */
    render: function(objectData, validationErrors) {

        var html = Handlebars.render(this.template, {
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

        for (var i = 0; i < this.columnsInformation.length; i++) {
            var columnInformation = this.columnsInformation[i];
            var formField = this.$element.find('#' + columnInformation.databaseName)

            if (! formField.exists()) {
                // en este caso estoy en una columna que esta en la base de datos
                // pero que no la estoy renderando
                continue;
            }

            if (columnInformation.type === 'date') {
                formField.datepicker({
                    format: 'dd/mm/yyyy'
                });
            } else if (columnInformation.isConst()) {
                formField.chosen();
            } else if (columnInformation.foreignKey !== null) {
                formField.chosen();
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
});


/**
 * Form que se va a crear en funcion de los tipos de los campos.
 *
 * A diferencia de la opcion del FormView, aca se crea el template
 * teniendo en cuenta que se especifican cuales son los campos que se
 * quieren mostrar.
 */
var FieldFormView = FormView.$extend({

    /**
     * Constructor.
     *
     * @param {Array(String)} columnNamesToShow: el nombre de las columnas (databaseName)
     *                                           que se quieren mostrar en el form.
     */
    __init__: function(element, columnsInformation, fkInformation, columnsNamesToShow) {
        var superTemplate = '' +
            '<form role="form" class="form-horizontal">' +
                '{{#each columnsNamesToShow}}' +
                    '{{renderFormField this ../columnsInformation ../fkInformation }}' +
                '{{/each}}' +
                '<div class="row">' +
                    '<div class="col-sm-offset-3">' +
                        '<input type="submit" class="btn btn-primary button-save">' +
                    '</div>' +
                '</div>' +
            '</form>';

        var template = Handlebars.render(superTemplate, {
                            columnsNamesToShow: columnsNamesToShow,
                            columnsInformation: columnsInformation,
                            fkInformation: fkInformation
        });
        this.$super(element, template, columnsInformation, fkInformation);
    }
});
