/**
 * Tiene toda la informacion sobre el schema de la base de datos.
 * No tiene informacion de las tablas en si, sino que tiene informacion
 * sobre el schema de las mismas.
 */
var DatabaseInformation = Class.$extend({

    __init__: function() {
        this.databaseInformation = {};
    },

    parseResponse: function(information) {
        for (var tableName in information) {
            var tableColumns = information[tableName];
            var columnsInformation = []
            this.databaseInformation[tableName] = columnsInformation;
            for (var i = 0; i < tableColumns.length; i++) {
                var currentColumn = tableColumns[i];
                var constValues = [];
                if (currentColumn.const_values) {
                    for (var j = 0; j < currentColumn.const_values.length; j++) {
                        var aux = currentColumn.const_values[j];
                        constValues.push(new ConstValue(aux.id,
                                                        aux.value,
                                                        aux.showOrder));
                    }
                }
                columnsInformation.push(new ColumnInformation(tableName,
                                                              currentColumn.name,
                                                              currentColumn.foreign_key,
                                                              currentColumn.type,
                                                              currentColumn.nullable,
                                                              currentColumn.primary_key,
                                                              constValues));
            }
            columnsInformation.sort(function(c1, c2) {
                if (c1.frontendName < c2.frontendName) {
                    return -1;
                } else {
                    return 1;
                }
            });
            this.databaseInformation[tableName] = columnsInformation;
        }
    },

    getTableColumns: function(tableName) {
        return this.databaseInformation[tableName];
    },

    getColumnInformation: function(tableName, columnName) {
        var tableColumns = this.getTableColumns(tableName);
        for (var i = 0; i < tableColumns.length; i++) {
            if (tableColumns[i].databaseName === columnName) {
                return tableColumns[i];
            }
        }
    }

});
