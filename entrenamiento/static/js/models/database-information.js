/**
 * Tiene toda la informacion sobre el schema de la base de datos.
 * No tiene informacion de las tablas en si, sino que tiene informacion
 * sobre el schema de las mismas.
 */
var DatabaseInformation = Class.$extend({

    __init__: function() {
        this.databaseInformation = null;
    },

    parseResponse: function(information) {
        this.databaseInformation = information;
    },

    getTableInformation: function(tableName) {
        return this.databaseInformation(tableName);
    }

});
