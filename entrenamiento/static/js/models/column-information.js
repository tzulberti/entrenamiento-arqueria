/**
 * Tiene toda la informacion de una de las columnas de la base de
 * datos.
 */
var ColumnInformation = Class.$extend({

    __init__: function(tableName, databaseName, foreignKey, type) {
        this.tableName = tableName;
        this.databaseName = databaseName;
        this.frontendName = databaseName.toTitleCase();
        this.foreingKey = foreignKey;
        this.type = type;
        this.constValues = [];
    },

    isCategoric: function() {
        return false;
    }
});
