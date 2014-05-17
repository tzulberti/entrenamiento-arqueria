/**
 * Tiene toda la informacion del nombre de un campo y como es que
 * el mismo  se tiene que renderar en el form.
 */
var FormFieldData = Class.$extend({

    /**
     * Constructor.
     *
     * @param {String} databaseName: el nombre de la columna de la base de
     *                               datos que se quiere mostrar.
     *
     * @param {String} helpText: el texto de ayuda que se tiene que mostrar
     *                           junto al campo.
     */
    __init__: function(databaseName, helpText) {
        this.databaseName = databaseName;
        this.helpText = helpText;
    }
});

/**
 * Indica al render del form, que se tiene que poner un <fieldset>,
 * hasta que encuentre el mismo que diga close
 */
var FieldsetFieldData = Class.$extend({

    /**
     * Constructor.
     *
     * @param {String} legend: la leyenda del fieldset que se tiene que
     *                         agregar.
     *
     * @param {boolean} open: si es True, entonces se tiene que abrir un
     *                        fieldset. En caso contrario se lo tiene
     *                        que cerrar
     */
    __init__: function(legend, open) {
        this.legend = legend;
        this.open = open;

    }

});
