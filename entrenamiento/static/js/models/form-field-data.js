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

/**
 * Tiene toda la informacion para renderar un campo en el form cuando
 * el mismo no es una columna de la base de datos.
 *
 */
var FormInputData = Class.$extend({

    /**
     * Constructor
     *
     * @param {String} name: el nombre del campo como se le va a mostrar al
     *                       usuario y como lo va a ver el mismo si hace un
     *                       post
     *
     * @param {String} inputType: indica si es un checkbox, input, textarea, etc...
     *
     * @param {String} helpText: el mensaje de ayuda que se le tiene que mostrar
     *                           al usuario
     */
    __init__: function(name, inputType, helpText) {
        this.name = name;
        this.inputType = inputType;
        this.helpText = helpText;
    }
});
