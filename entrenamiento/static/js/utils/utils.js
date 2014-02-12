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
    }
};


