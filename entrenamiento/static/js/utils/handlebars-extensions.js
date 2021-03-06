/**
 * Define algunas extensiones comunes para todo lo que tiene que ver
 * con handlebars.
 *
 */
Handlebars.render = function(template, context) {
    var template = Handlebars.compile(template);
    return template(context);
};

/**
 * Convierte el nombre de la columna en algo que se pueda leer por el
 * usuario y no por algo que no se entienda que es lo que esta
 * pasando.
 */
Handlebars.registerHelper('readableName', function(columnName) {
    var tmp = columnName.replace(/_/g, ' ');
    return _.str.titleize(tmp);
});


/**
 * Se encarga de traducir un template para que despues handlebars
 * lo pueda entender.
 *
 * En este caso el template que se recive usa los siguientes cambios
 * con respecto a handlebars:
 *
 * - en vez de usar {{ y }}, usa [[ y ]]
 *
 * @param {String} template: el template que tiene que ser devuelto
 *                           para que handelbars lo pueda renderar la proximca
 */
Handlebars.registerHelper('raw', function(template) {
    template = template.replace(/\[\[/g, "{{");
    template = template.replace(/\]\]/g, "}}");

    return new Handlebars.SafeString(template);
});


/**
 * Se encarga de renderar un campo del form teniendo en cuenta el tipo
 * de valor de la base de datos.
 *
 *
 * @param {FormFieldData} fielData: toda la informacion sobre el campo en
 *                                  cuestion que se tiene que renderar.
 *
 * @param {Array(ColumnInformation)} columnsInformation: la informaicon de
 *                             todas las columnas en la que pertence
 *                             la columna del form.
 *
 * @param {FkInformation} fkInformation: toda la informacion de la tablas
 *                                       referenciadas a las que pertence la
 *                                       columna.
 *
 * @param {String helpText: el texto de ayuda que se quiere mostrar junto al
 *                          campo en cuestion.
 *
 *
 * @param {boolean} required: si es true, entonces se va a marcar en especial
 *                            el campo como requerido
 */
Handlebars.registerHelper('renderFormField', function(fieldData, columnsInformation, fkInformation, helpText, required) {
    var fkValues = [];
    var columnInformation = null;
    if (fieldData instanceof FieldsetFieldData) {
        var res = '';
        if (fieldData.open) {
            res = '<fieldset>';
            if (fieldData.legend) {
                res += '<legend>' + fieldData.legend + '</legend>';
            }
        } else {
            res = '</fieldset>';
        }

        return new Handlebars.SafeString(res);
    }

    if (fieldData instanceof FormInputData) {
        var templateRes = null;
        if (fieldData.inputType === 'checkbox') {
            templateRes = '<div class="form-group">' +
                '<div class="col-sm-10 col-sm-offset-2">' +
                    '<div clas="checkbox">' +
                        '<label>' +
                            '<input type="checkbox" name="{{ fieldData.name }}" id="{{ fieldData.name }}">' +
                            '{{ fieldData.name }}' +
                            '{{#if fieldData.helpText }}' +
                                '<span class="help-block">{{ fieldData.helpText }}</span>' +
                            '{{/if}}'+
                        '</label>' +
                    '</div>' +
                '</div>' +
            '</div>';
        } else {
            throw Error('No hice esto todavia');
        }

        var res = Handlebars.render(templateRes, {
            fieldData: fieldData
        });
        return new Handlebars.SafeString(res);
    }


    for (var i = 0; i < columnsInformation.length; i++) {
        if (columnsInformation[i].databaseName === fieldData.databaseName) {
            columnInformation = columnsInformation[i];
            break;
        }
    }
    if (columnInformation === null) {
        throw new Error('No puede encontrar la informacion para la columna: ' +
                        fieldData.databaseName);
    }


    var templateRes = ''
    if (columnInformation.type === 'boolean') {
        templateRes = '' +
            '<div class="form-group {{raw "[[#if"}} validationErrors.{{ columnInformation.databaseName }} {{raw "]]has-error[[/if]]" }}">' +
                '<div class="col-sm-10 col-sm-offset-2">' +
                    '<div clas="checkbox">' +
                        '<label>' +
                            '<input type="checkbox" name="{{ columnInformation.databaseName}}" id="{{ columnInformation.databaseName}}">' +
                            '{{ columnInformation.frontendName }}' +
                        '</label>' +
                    '</div>' +
                '</div>' +
            '</div>';
    } else {
        templateRes = '' +
            '<div class="form-group {{raw "[[#if"}} validationErrors.{{ columnInformation.databaseName }} {{raw "]]has-error[[/if]]" }}">' +
                '<label for="{{ columnInformation.databaseName }}" class="col-sm-2 control-label">' +
                    '{{ columnInformation.frontendName }}{{#if required }}*{{/if}}' +
                '</label>' +
                '<div class="col-sm-10">';
        if (columnInformation.isConst() || columnInformation.foreignKey !== null) {
            if (columnInformation.isConst()) {
                fkValues = columnInformation.constValues;
            } else {
                fkValues = fkInformation.getTableValues(columnInformation.foreignKey);
            }

            var hasImagePath = false;
            if (! _.isEmpty(fkValues)) {
                hasImagePath = _.has(fkValues[0], 'imagePath');
            }
            if (hasImagePath) {
                templateRes += '' +
                        '<select name="{{ columnInformation.databaseName }}" id="{{ columnInformation.databaseName }}" class="chosen-with-image">' +
                            '{{#if columnInformation.nullable }}' +
                                '<option value=""></option>' +
                            '{{/if }}' +
                            '{{#each fkValues }}' +
                                '{{#if this.imagePath}}' +
                                    '<option value="{{ this.id}}" data-img-src="/uploads/{{ this.imagePath }}">{{ this.value }}</option>' +
                                '{{else }}'+
                                    '<option value="{{ this.id}}" data-img-src="">{{ this.value }}</option>'+
                                '{{/if}}' +
                            '{{/each}}' +
                        '</select>';
            } else {
                templateRes += '' +
                        '<select name="{{ columnInformation.databaseName }}" id="{{ columnInformation.databaseName }}">' +
                            '{{#if columnInformation.nullable }}' +
                                '<option value=""></option>' +
                            '{{/if }}' +
                            '{{#each fkValues }}' +
                                '<option value="{{ this.id }}">{{ this.value }}</option>' +
                            '{{/each}}' +
                        '</select>';
            }

        } else if (_.str.include(columnInformation.databaseName, '_path')) {
            templateRes += '<div class="existing-upload" id="{{ columnInformation.databaseName }}_existing"></div>';
            templateRes += '<input type="hidden" name="{{ columnInformation.databaseName }}" id="{{ columnInformation.databaseName }}" class="form-control">';
            templateRes += '<input type="file" name="{{ columnInformation.databaseName }}_upload" id="{{ columnInformation.databaseName }}_upload" class="form-control">';
        } else if (columnInformation.type === 'textarea') {
            templateRes += '<textarea type="text" name="{{ columnInformation.databaseName }}" id="{{ columnInformation.databaseName }}" class="form-control"></textarea>';
        } else {
            templateRes += '<input type="text" name="{{ columnInformation.databaseName }}" id="{{ columnInformation.databaseName }}" class="form-control">';
        }

        // para que renderee la parte del help si es que tiene
        if (fieldData.helpText) {
            templateRes += '<span class="help-block">{{ helpText }}</span>';
        }

        // para que renderee los errores si es necesario
        templateRes += '{{raw "[[#if"}} validationErrors.{{columnInformation.databaseName }} {{ raw "]]" }}' +
                            '<span class="help-block error-message">' +
                                '{{raw "[["}} validationErrors.{{ columnInformation.databaseName }} {{raw "]]" }}' +
                            '</span>' +
                        '{{raw "[[/if]]" }}';


        templateRes += '</div>';
        templateRes += '</div>';
    }
    var res = Handlebars.render(templateRes, {
                            columnInformation: columnInformation,
                            required: required,
                            fkValues: fkValues,
                            helpText: fieldData.helpText
    });

    return new Handlebars.SafeString(res);

});

/**
 * Se encarga de renderar toda todos los campos del form para que uno este
 * a la izquierda del otro en vez de hacer que uno este debajo del
 * otro.
 *
 * @param {FormFieldData} fielData: toda la informacion sobre el campo en
 *                                  cuestion que se tiene que renderar.
 *
 * @param {Array(ColumnInformation)} columnsInformation: la informaicon de
 *                             todas las columnas en la que pertence
 *                             la columna del form.
 *
 * @param {FkInformation} fkInformation: toda la informacion de la tablas
 *                                       referenciadas a las que pertence la
 *                                       columna.
 *
 * @param {String helpText: el texto de ayuda que se quiere mostrar junto al
 *                          campo en cuestion.
 *
 *
 * @param {boolean} required: si es true, entonces se va a marcar en especial
 *                            el campo como requerido
 */
Handlebars.registerHelper('renderFormFieldInline', function(fieldData, columnsInformation, fkInformation, helpText, required) {
    var fkValues = [];
    var columnInformation = null;
    if (fieldData instanceof FieldsetFieldData) {
        var res = '';
        if (fieldData.open) {
            res = '<fieldset>';
            if (fieldData.legend) {
                res += '<legend>' + fieldData.legend + '</legend>';
            }
        } else {
            res = '</fieldset>';
        }

        return new Handlebars.SafeString(res);
    }


    for (var i = 0; i < columnsInformation.length; i++) {
        if (columnsInformation[i].databaseName === fieldData.databaseName) {
            columnInformation = columnsInformation[i];
            break;
        }
    }
    if (columnInformation === null) {
        throw new Error('No puede encontrar la informacion para la colun: ' +
                        fieldData.databaseName);
    }


    var templateRes = ''
    if (columnInformation.type === 'boolean') {
        templateRes = '' +
                    '<div clas="checkbox">' +
                        '<label>' +
                            '<input type="checkbox" name="{{ columnInformation.databaseName}}" id="{{ columnInformation.databaseName}}">' +
                            '{{ columnInformation.frontendName }}' +
                        '</label>' +
                    '</div>';
    } else {
        templateRes = '' +
            '<div class="form-group {{raw "[[#if"}} validationErrors.{{ columnInformation.databaseName }} {{raw "]]has-error[[/if]]" }}">' +
                '<label for="{{ columnInformation.databaseName }}" class="sr-only">' +
                    '{{ columnInformation.frontendName }}{{#if required }}*{{/if}}' +
                '</label>';
        if (columnInformation.isConst() || columnInformation.foreignKey !== null) {
            templateRes += '' +
                    '<select name="{{ columnInformation.databaseName }}" id="{{ columnInformation.databaseName }}">' +
                        '{{#if columnInformation.nullable }}' +
                            '<option value=""></option>' +
                        '{{/if }}' +
                        '{{#each fkValues }}' +
                            '<option value="{{ this.id }}">{{ this.value }}</option>' +
                        '{{/each}}' +
                    '</select>';

            if (columnInformation.isConst()) {
                fkValues = columnInformation.constValues;
            } else {
                fkValues = fkInformation.getTableValues(columnInformation.foreignKey);
            }
        } else if (_.str.include(columnInformation.databaseName, '_path')) {
            templateRes += '<div class="existing-upload" id="{{ columnInformation.databaseName }}_existing"></div>';
            templateRes += '<input type="hidden" name="{{ columnInformation.databaseName }}" id="{{ columnInformation.databaseName }}" class="form-control">';
            templateRes += '<input type="file" name="{{ columnInformation.databaseName }}_upload" id="{{ columnInformation.databaseName }}_upload" class="form-control">';
        } else if (columnInformation.type === 'textarea') {
            templateRes += '<textarea type="text" name="{{ columnInformation.databaseName }}" id="{{ columnInformation.databaseName }}" class="form-control"></textarea>';
        } else {
            templateRes += '<input type="text" name="{{ columnInformation.databaseName }}" id="{{ columnInformation.databaseName }}" class="form-control" placeholder="{{ columnInformation.frontendName }}">';
        }

        // para que renderee la parte del help si es que tiene
        /*
        if (fieldData.helpText) {
            templateRes += '<span class="help-block">{{ helpText }}</span>';
        }

        // para que renderee los errores si es necesario
        templateRes += '{{raw "[[#if"}} validationErrors.{{columnInformation.databaseName }} {{ raw "]]" }}' +
                            '<span class="help-block error-message">' +
                                '{{raw "[["}} validationErrors.{{ columnInformation.databaseName }} {{raw "]]" }}' +
                            '</span>' +
                        '{{raw "[[/if]]" }}';
        */


        templateRes += '</div>';
    }
    var res = Handlebars.render(templateRes, {
                            columnInformation: columnInformation,
                            required: required,
                            fkValues: fkValues,
                            helpText: fieldData.helpText
    });

    return new Handlebars.SafeString(res);

});





/**
 * Se necarga de renderar un filtro que el usuario creo cuando se esta viendo
 * toda la informacion en forma de tabla.
 *
 * @param {Filter} filter: la informacion del filtro que aplico el usuario.
 *
 * @param {DatabaseInformation} databaseInformation: tiene toda la informacion
 *                                  del schema de la base de datos.
 *
 * @param {FkInformation} fkInformation: tiene toda la informacion de las tablas
 *                                       referenciadas que no son constantes.
 */
Handlebars.registerHelper('renderFilterData', function(filter, databaseInformation, fkInformation) {
    var columnInformation = databaseInformation.getColumnInformation(filter.tableName,
                                                                     filter.columnName);
    var res = columnInformation.frontendName;
    var readableOperators = {
        'eq': '=',
        'neq': '!=',
        'lt': '<',
        'let': '<=',
        'gt': '>',
        'get': '>='
    }
    res += ' ' + readableOperators[filter.operator];
    if (columnInformation.isConst()) {
        // si es por alguna constante entonces tengo que buscar el valor
        // correspondiente de la misma
        var id = parseInt(filter.value, 10);
        var constValue = columnInformation.getConstValue(id);
        res += ' ' + constValue.value;
    } else if (columnInformation.foreignKey !== null) {
        var id = parseInt(filter.value, 10);
        var referencedInfo = fkInformation.getValue(columnInformation.foreignKey,
                                                    id);
        res += ' ' + referencedInfo.value;

    } else {
        res += ' ' + filter.value;
    }
    return res;
});

/**
 * Se encarga de rendrear todos los nombres de las columnas que tienen que ir
 * junto a los headers de la aplicacion.
 *
 * @param {String} columnName: el nombre de la columna que se quiere mostrar.
 *
 * @param {String} orderBy: el nombre de la columna por la que se ordeno
 *                          toda la informacion.
 *
 * @param {String} orderDirection: indica en que sentido se ordeno toda
 *                                 la informacion.
 *
 * @param {Array(ColumnInformation)} columnsInformation: tiene toda la informacion
 *                          sobre el schema de las columnas de la tabla.
 */
Handlebars.registerHelper('renderColumnHeader', function(columnName, orderBy, orderDirection, columnsInformation) {
    if (_.contains(columnName, '.')) {
        var tmp = columnName.split('.');
        return _.last(tmp);
    } else {
        var columnInformation = _.find(columnsInformation, function(ci) { return ci.databaseName == columnName});
        if (! columnInformation) {
            throw new Error('La columna: ' + columnName + ' no corresponde a la tabla');
        }
        var res = '<a href="#" class="column-name" id="column-' + columnInformation.databaseName + '">';
        res += columnInformation.frontendName;
        if (columnName == orderBy) {
            if (orderDirection === 'ASC') {
                res += '<span class="glyphicon glyphicon-chevron-down"></span>';
            } else {
                res += '<span class="glyphicon glyphicon-chevron-up"></span>';
            }
        }
        res += '</a>';
        return new Handlebars.SafeString(res);
    }
});

/**
 * Se encarga de renderar una de la fila de las tablas que contiene
 * toda la informacion que se le tiene que mostrar al usuario.
 *
 * Esto muestra toda la informacion en el orden correspondiente teniendo
 * en cuenta ademas que se tiene que agregar las columnas de "edit" y
 * "delete".
 *
 * @param {Object} data: la informacion enviaada desde el servidor que se tiene
 *                       que mostrar en forma de row.
 *
 * @param {Array(String)} columnNames: todas las columnas de la tabla que
 *                                     se tienen que mostrar.
 *
 * @param {Array(ColumnInformation)} columnInformation: tiene toda la informacion de las
 *                                                      columnas de la tabla que se
 *                                                      esta mostrando
 *
 * @param {FkInformation} fkInformation: tiene toda la informacion de los objetos
 *                                       relacionados
 */
Handlebars.registerHelper('renderTableRow', function(data, columnNames, columnsInformation, fkInformation) {
    var res = '';
    for (var index in columnNames) {
        var columnName = columnNames[index];
        var columnSchema = null;

        if (_.contains(columnName, '.')) {
            // no es de lo mas lindo pero deberia funcionar
            var tmp = columnName.split('.');
            var tableName = tmp[0];
            var anotherColumnName = tmp[1];

            var anotherTableColumns = window.app.databaseInformation.getTableColumns(tableName);
            for (var i = 0; i < anotherTableColumns.length; i++) {
                if (anotherTableColumns[i].databaseName === anotherColumnName) {
                    columnSchema = anotherTableColumns[i];
                    break;
                }
            }

        } else {
            for (var i = 0; i< columnsInformation.length; i++) {
                if (columnsInformation[i].databaseName === columnName) {
                    columnSchema = columnsInformation[i];
                    break;
                }
            }
        }

        if (columnSchema === null) {
            throw new Error('No se pudo encontrar informacion para la ' +
                            'columna: ' + columnName);
        }


        var value = null;
        if (_.contains(columnName, '.')) {
            var tmp = columnName.split('.');
            value = data
            for (var i = 0; i< tmp.length; i++) {
                value = value[tmp[i]];
            }
        } else {
            value = data[columnName];
        }
        if (value === true) {
            value = '<span class="glyphicon glyphicon-ok"></span>';
        } else if (value === false) {
            value = '<span class="glyphicon glyphicon-minus"></span>';
        }

        if (value === null) {
            value = '&nbsp;';
        } else if (columnSchema.isConst()) {
            value = columnSchema.getConstValue(value).value;
        } else if (columnSchema.foreignKey !== null) {
            value = fkInformation.getValue(columnSchema.foreignKey, value).value;
        }
        res += '<td>' + value + '</td>';
    }

    res +=  '' +
        '<td>'+
            '<button type="button" class="btn btn-success btn-sm button-edit" id="edit-' + data.id + '">' +
                '<span class="glyphicon glyphicon-edit"></span>' +
            '</button>' +
        '</td>'+
        '<td>' +
            '<button type="button" class="btn btn-danger btn-sm button-delete" id="delete-' + data.id +'">' +
                '<span class="glyphicon glyphicon-remove"></span>' +
            '</button>' +
        '</td>';
    return new Handlebars.SafeString(res);
});


/**
 * Hace la comparacion logica entre dos valores teniendo en cuenta el
 * operador especificado.
 *
 * El operatod tiene que ser un string, que representa la operacion
 * logica que se quiere hacer.
 *
 */
Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
        case '!':
            return (! v1) ? options.fn(this): options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

/**
 * Se fija si el valor especificado es una instancia del segundo valor.
 *
 * En este caso, el segundo valor esta especificado en un string, pero
 * luego se va a buscar la instancia correspondiente en funcion de ese
 * string.
 *
 */
Handlebars.registerHelper('isInstance', function(value, klassName, options) {
    var klass = null;
    switch (klassName) {
        case 'ColumnInformation':
            return (value instanceof ColumnInformation) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});


/**
 * Iteracion usada para trabajar con el tema de un rango de valores en vez
 * de una lista.
 *
 * @param {int} maxValue: la cantidad de elementos que va a a tener la lista.
 */
Handlebars.registerHelper('rangeEach', function(maxValue, options) {
    var res = '';
    var data = null;
    if (options.data) {
        data = Handlebars.createFrame(options.data);
    }

    for (var i = 0; i < maxValue; i++) {
        if (data) {
            data.index = i;
            data.first = (i === 0);
            data.last = (i === (maxValue - 1));
        }
        // lo tengo que llamar con un objecto porque si dentro del
        // mismo llamo a setIndex, el mismo no funciona
        res += options.fn({i: i}, {data: data});
    }
    return res;
});


/**
 * Helper para cuando se tiene un each anidado dentro de otro.
 *
 * Se lo usa para conservar el indice del padre.
 * Ver: http://stackoverflow.com/questions/14854491
 */
Handlebars.registerHelper('setIndex', function(name, value) {
    this[name] = parseInt(value, 10);
});


/**
 * Hace la operacion matematica entre dos numeros cualquiera.
 *
 * @param {float} lvalue: el valor de la izquierda de la operacion.
 *
 * @param {String} operator: el operador de la operacion. Es importante
 *                           tener en cuenta que en el template este se lo
 *                           tiene que poner como un string.
 *
 * @param {float} rvalue: el valor de la derecha de la operacion
 */
Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);

    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[operator];
});
