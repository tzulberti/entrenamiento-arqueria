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

