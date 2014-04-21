/**
 * Algunas extensiones que le agrego a jQuery para poder simplificar
 * mas el codigo.
 */
$.fn.serializeObject = function() {
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};

$.fn.clean = function() {
    this.children().off('*');
    this.empty();
};

/**
 * Chequea si elemento del DOM existe.
 */
jQuery.fn.exists = function(){return this.length>0;}

var csrftoken = $('meta[name=csrf-token]').attr('content')

/**
 * Adds the CSRF token before the request is done.
 */
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type)) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken)
        }
    }
});

/**
 * Handles the different type of error when doing an ajax request.
 *
 * This won't be used when there is a form validation error.
 */
$(document).ajaxError(function(ev, jqXHR, ajaxSettings, thrownError) {
    if (jqXHR.status === 401) {
        // el usuario nunca se logueo, por lo que lo redirigo a la pagina
        // correspondiente
        window.location = '/login/';
    } else if (jqXHR.status === 403) {
        // en este caso el usuario no tiene el permiso para ver los datos
        // de la persona en cuestion.
    } else if (jqXHR.status === 500) {
        // en este caso ocurrio un error de javascript por lo que tengo
        // que mostrar el mensaje de error por pantalla
        $("#javascript-error").show();
    }
});
