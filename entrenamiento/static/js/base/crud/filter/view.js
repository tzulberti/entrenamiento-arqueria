/**
 * La view que se encarga de renderar una de las condiciones por las que esta
 * filtrando el usuario.
 */
var FilterView = Class.$extend({

    /**
     * Constructor.
     *
     * @param {jQuery} element: el elemento del DOM en donde se tiene que mostrar
     *                          esta condicion.
     *
     * @param {DatabaseInformation} databaseInformation: el modelo que tiene toda
     *                          la informacion sobre el schema de la base de datos.
     *
     * @param {FkInformation} fkInformation: tiene toda la informacion sobre
     *                                       los valores referenciados por la
     *                                       tabla que se esta filtrando.
     *
     * @param {String} tableName: el nombre de la tabla por la que se esta
     *                            aplicando los filtros correspondientes
     */
    __init__: function(element, databaseInformation, fkInformation, tableName) {
        this.$element = element;
        this.databaseInformation = databaseInformation;
        this.fkInformation = fkInformation;

        this.columns = this.getColumns(tableName, 0);

        this.template = $("#filter-view-handlebars-template").html();
    },

    /**
     * Se encarga de renderar la opcion de loading encima del filtro. Esto se
     * lo usa cuando se selecciona una columna que es una FK a otra tabla,
     * y se esta obteniendo la informacion de esta tabla.
     */
    renderLoading: function() {
        console.log('loading...');
    },

    /**
     * Se encarga de renderar la condicion de filtrado para
     * la tabla especificada.
     *
     * @param {String} tableName: el nombre de la tabla de la base de datos
     *                            para la cual se tiene que mostrar una
     *                            condicion de filtrado.
     *
     *
     * @param {String} columnName: el nombre de la tabla que se selecciono.
     *
     * @param {Integer} id: el identificador de este filtro.
     *
     */
    render: function(columnName, id) {
        var tmp = columnName.split('.');
        var columnInformation = this.databaseInformation.getColumnInformation(tmp[0],
                                                                              tmp[1]);
        var fkValues = [];
        if (columnInformation.foreignKey !== null && (! columnInformation.isConst())) {
            // en este caso la columna que selecciono el usuario es una FK a otra
            // tabla de la base de datos.
            fkValues = this.fkInformation.getTableValues(columnInformation.foreignKey);
        }
        var html = Handlebars.render(this.template, {
                        id: id,
                        columnsInformation: this.columns,
                        constValues: columnInformation.constValues,
                        fkValues: fkValues
        });
        this.$element.clean();
        this.$element.html(html);

        this.$element.find('.column-name').val(columnName);
        this.$element.find('.column-name').chosen({width: '300px'});
        if (columnInformation.type === 'date') {
            this.$element.find('.value').datepicker({
                format: 'dd/mm/yyyy'
            });
        }

        if (columnInformation.isConst() || ! _.isEmpty(fkValues)) {
            this.$element.find('.value').chosen({width: '300px'});
        }
    },

    /**
     * Se encarga de agregar todas las columnas que se pueden llegar a mostrar en
     * el combo teniendo en cuenta las columnas de las tablas a las que
     * referencia la misma para que se muestren para que el usuario pueda filtrar.
     *
     * @param {String} tableName: todas las columnas que se pueden llegar a mostrar
     *                            al momento de filtrar por la data.
     */
    getColumns: function(tableName, depth) {
        if (depth > 1) {
            return null;
        }

        var tmp = this.databaseInformation.getTableColumns(tableName);
        var res = []
        for (var i = 0; i < tmp.length; i++) {
            var currentColumnInfo = tmp[i];
            if (currentColumnInfo.primaryKey) {
                // el usuario nunca puede filtrar por los valores que son
                // primary key
                continue;
            }

            if (currentColumnInfo.isConst() || currentColumnInfo.foreignKey === null) {
                res.push(currentColumnInfo);
            } else if (depth > 0) {
                // no puedo filtrar por las FK de la tabla, porque
                // el FKInformation no tiene la informacion de las mismas
                continue;
            } else {
                res.push(currentColumnInfo);
                var anotherTableColumns = this.getColumns(currentColumnInfo.foreignKey, depth + 1);
                if (anotherTableColumns !== null) {
                    res.push({frontendName: currentColumnInfo.frontendName,  columns: anotherTableColumns});
                }
            }
        }

        return res;
    }


});
