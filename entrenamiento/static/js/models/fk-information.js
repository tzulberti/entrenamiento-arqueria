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
    },

    /**
     * Se encarga de buscar la informacion que tiene el id
     *
     * @param {String} talbeName: el nombre de la tabla a la que pertence
     *                            el valor en cuestion.
     *
     * @param {int} id: el identificador del valor que se quiere
     */
    getValue: function(tableName, id) {
        var data = this.getTableValues(tableName);
        for (var i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                return data[i];
            }
        }
    }
});
