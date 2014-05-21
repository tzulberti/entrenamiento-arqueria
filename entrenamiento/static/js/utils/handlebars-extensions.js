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
    return columnName.toTitleCase();
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
        } else {
            templateRes += '<input type="text" name="{{ columnInformation.databaseName }}" id="{{ columnInformation.databaseName }}" class="form-control">';
        }

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
                            fkValues: fkValues
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

Handlebars.registerHelper('renderColumnHeader', function(columnName, orderBy, orderDirection) {
    var res = '<a href="#" class="column-name" id="column-' + columnName + '">';
    res += columnName.toTitleCase();
    if (columnName == orderBy) {
        if (orderDirection === 'ASC') {
            res += '<span class="glyphicon glyphicon-chevron-down"></span>';
        } else {
            res += '<span class="glyphicon glyphicon-chevron-up"></span>';
        }
    }
    res += '</a>';
    return new Handlebars.SafeString(res);
});

/**
 * Se encarga de renderar una de la fila de las tablas que contiene
 * toda la informacion que se le tiene que mostrar al usuario.
 *
 * Esto muestra toda la informacion en el orden correspondiente teniendo
 * en cuenta ademas que se tiene que agregar las columnas de "edit" y
 * "delete".
 */
Handlebars.registerHelper('renderTableRow', function(data, columnNames) {
    var res = '';
    for (var index in columnNames) {
        var columnName = columnNames[index];
        var value = data[columnName];
        if (value === true) {
            value = '<span class="glyphicon glyphicon-ok"></span>';
        } else if (value === false) {
            value = '<span class="glyphicon glyphicon-minus"></span>';
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
