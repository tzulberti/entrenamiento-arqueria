/**
 * Se encarga de hacer todos los llamados AJAX de la aplicacion,
 * para que todos los llamados ajax se hagan desde un mismo
 * lugar.
 */
var APIManager = Class.$extend({

    __init__: function() {
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
    },

    /**
     * El callback por default a ser ejecutado cuando hubo algun error
     * en el llamado ajax.
     *
     * Se encarga de redirigir al usuario a la URL correspondiente,
     * o mostrarle un mensaje de error teniendo en cuenta el tipo
     * de error.
     */
    ajaxError: function(jqXHR, ajaxSettings, thrownError) {
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
    },


    /**
     * Hace el llamado ajax teniendo en cuenta toda la infornacion
     * que se le pasa.
     *
     * @param {String} url: una URL relativa a la parte base de la
     *                      API. Es decir sin /api/v01/.
     *
     * @param {Object} data: toda la informacion de la data que se tiene que
     *                       submitear con el llamado ajax.
     *
     * @param {String} type: indica si es un POST, PUT, GET o DELETE.
     *
     * @param {Function} successCallback: el callback que tiene que ser
     *                                    ejecutado en caso de que el llamado
     *                                    ajax no devuelva un error.
     */
    ajaxCall: function(url, data, type, successCallback) {
        $.ajax({
            type: type,
            url: '/api/v01/' + url,
            data: data,
            success: successCallback,
            error: $.proxy(this.ajaxError, this)
        });
    },
});
