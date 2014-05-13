/**
 * Tiene toda la informacion de las ForeignKeys de la tabla con
 * la que el usuario esta trabajando pero que no son columnas
 * constantes.
 *
 * Por ejemplo, tiene toda la informacion de los torneos, o de
 * los usuarios.
 */
var FkInformation = Class.$extend({

    __init__: function() {
        this.information = {};
    },

    parseTableResponse: function(tableName, information) {
        this.information[tableName] = information;
    },

    getTableValues: function(tableName) {
        return this.information[tableName];
    }
});
