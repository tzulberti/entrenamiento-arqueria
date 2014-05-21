/**
 * Tiene toda la informacion de una de las columnas de la base de
 * datos.
 */
var ColumnInformation = Class.$extend({

    /**
     * Constructor.
     *
     * @param {String} tableName: el nombre de la tabla a donde pertenece esta columna.
     *
     * @paramm {String} databaseName: el nombre de la columna como figura en la base de datos.
     *
     * @param {String} foreignKey: en caso de que la columna sea una FK a otra, entonces
     *                             tiene el nombre de la tabla a la que referencia. Si la
     *                             misma es constante, entonces va a tener el nombre de la
     *                             tabla constante a la que referencia
     *
     * @param {String} type: indica el tipo de la columna (numerno, string, etc...)
     *
     * @param {boolean} nullable: si es True, entonces la columna en cuestion puede
     *                            tener valores null
     *
     * @param {Array(ConstValue)} constValues: en caso de que la columna sea una
     *                                         referencia a valores constantes, entonces
     *                                         son los valores constantes en cuestion
     */
    __init__: function(tableName, databaseName, foreignKey, type, nullable, constValues) {
        this.tableName = tableName;
        this.databaseName = databaseName;
        this.frontendName = databaseName.toTitleCase();
        this.foreignKey = foreignKey;
        this.type = type;
        this.nullable = nullable;
        this.constValues = constValues;
    },

    /**
     * Indica si los valores de la columna que puede tomar son constantes
     * o no.
     */
    isConst: function() {
        return ! _.isEmpty(this.constValues);
    },

    /**
     * Busca el valor constante teniendo en cuenta el identificador del
     * mismos
     *
     * @param {int} id: el identificador del {ConstValue} que se esta
     *                  buscando
     *
     * @return {ConstValue} correspondiente. Se tira una excepcion
     *         sino se encontro ninguno.
     */
    getConstValue: function(id) {
        for (var i = 0; i < this.constValues.length; i++) {
            if (this.constValues[i].id === id) {
                return this.constValues[i];
            }
        }
        throw new Error('No se encontro nignun valor constante para la ' +
                        'column: ' + this.databaseName + ' con id: ' +
                        id);
    }
});

/**
 * Tiene toda la informacion de uno de los valores constantes que puede
 * llegar a tomar la columna
 */
var ConstValue =  Class.$extend({

    /**
     * Constructor.
     *
     * @param {int} id: el identificador del valor constante en la base de datos.
     *
     * @param {String} value: el texto que se le tiene que mostrar al usuario.
     *
     * @param {int} showOrder: el orden en el que se tiene que mostrar
     *                         los diferentes valores constantes.
     */
    __init__: function(id, value, showOrder) {
        this.id = id;
        this.value = value;
        this.showOrder = showOrder;
    }
});
