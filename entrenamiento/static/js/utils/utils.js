/**
 * Equivalente a la funcion range de python.
 */
function range(start, stop, step){
    if (typeof stop=='undefined'){
        // one param defined
        stop = start;
        start = 0;
    };
    if (typeof step=='undefined'){
        step = 1;
    };
    if ((step>0 && start>=stop) || (step<0 && start<=stop)){
        return [];
    };
    var result = [];
    for (var i=start; step>0 ? i<stop : i>stop; i+=step){
        result.push(i);
    };
    return result;
};

var utils = {

    /**
    * Se encarga de mostrar todos los errores que tiene el form.
    *
    * @param {jQuery} $element: el elemento del DOM que corresponde al form que
    *                           tiene el mensaje de error.
    *
    * @param jqXHR: la respuesta del servidor que indica cuales son los campos
    *               que tienen valores invalidos y el porque.
    */
    renderFormErrors: function($element, jqXHR) {
        $element.find('.form-group').removeClass('has-error');
        $element.find('.error-message').remove();

        var formErrors = JSON.parse(jqXHR.responseText);
        for (var fieldName in formErrors) {
            var formElement = $element.find('input[name=' + fieldName + ']');
            formElement.focus();
            var formGroupElement = formElement.parents('.form-group');
            formGroupElement.addClass('has-error');
            formElement.after('<span class="help-block error-message">' + formErrors[fieldName] + '</span>');
        }
    },


    /**
     * Se encarga de renderar toda la informacion en el elemento.
     *
     * Para esto, se supone que el elemento ya fue rendereado, y solo se tiene
     * mostrar la informacion dentro del mismo.
     *
     * @param {jQuery} $element: el elemento del DOM en donde se tiene que mostrar
     *                           toda la informacion.
     *
     * @param {Object} data: la informacion que se tiene que mostrar.
     *
     * @param {String} prefix: en caso de que los elementos del DOM empiezen con un
     *                         prefijo, entonces este es el mismo.
     */
    renderFormData: function($element, data, prefix) {
        for (attributeName in data) {
            var value = data[attributeName];
            if ($.isPlainObject(value)) {
                // en este caso me esta mandando la informacion
                // del objecto relacionado, que no me interesa.
                continue;
            }
            var inputId = attributeName;
            if (prefix !== null && prefix !== '') {
                inputId = prefix + '-' + attributeName;
            }
            var inputField = $element.find('#' + inputId);


            if (! inputField.exists()) {
                console.log('No se pudo encontrar el campo correspondiente ' +
                            'para el attributo: ' + inputId);
                continue;
            }
            if (inputField.is('input')) {
                if (inputField.attr('type') === 'text') {
                    inputField.val(value);
                } else if (inputField.attr('type') === 'checkbox') {
                    if (value === 1 || value) {
                        inputField.prop('checked', true);
                    } else {
                        inputField.prop('checked', false);
                    }
                }
            } else if (inputField.is('textarea')) {
                inputField.val(value);
                inputField.blur();
            } else if (inputField.is('select')) {
                inputField.val(value);
            } else {
                // TODO en este caso estoy en un select...
            }
        }
    }
};


