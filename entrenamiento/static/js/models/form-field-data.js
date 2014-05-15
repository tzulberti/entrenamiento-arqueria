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
