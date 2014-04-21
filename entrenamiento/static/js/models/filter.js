/**
 * Tiene toda la informacion de uno de los filtros que se van
 * a aplicar
 */
var Filter = Class.$extend({

    /**
     * Constructor.
     *
     * @param {String} tableName: el nombre de la tabla de la base de datos
     *                            a la cual se aplica este filtro.
     *
     * @param {String} columnName: el nombre de la columna de la tabla.
     *
     * @param {String} operator: indica porque operador de comparacion se
     *                           esta filtrando toda la informacion.
     *
     * @param {String or int or Array(int)} value: el valor que selecciono el
     *                          usuario.
     */
    __init__: function(tableName, columnName, operator, value) {
        this.tableName = tableName;
        this.columnName = columnName;
        this.operator = operator;
        this.value = value;
    }
});
