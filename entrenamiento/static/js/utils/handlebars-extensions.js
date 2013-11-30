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

