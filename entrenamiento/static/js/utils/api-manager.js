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
    ajaxError: function(originalErrorCallback, jqXHR, textStatus, thrownError) {
        if (jqXHR.status === 0) {
            // en este caso no se pudo conectar para ver la informacion con
            // el servidor
            var opts = {
                title: "Error",
                text: "No se pudo conectar con el servidor. Por favor mandar un mail a tomas@escuela-de-arqueria.com.ar",
                type: 'error',
            };
            new PNotify(opts);
        } else if (jqXHR.status === 401) {
            // el usuario nunca se logueo, por lo que lo redirigo a la pagina
            // correspondiente
            window.location = '/login/';
        } else if (jqXHR.status === 403) {
            // en este caso el usuario no tiene el permiso para ver los datos
            // de la persona en cuestion.
        } else if (jqXHR.status === 404) {
            // no se encontro la URL porque falto registrarla en las views
            var opts = {
                title: "Error",
                text: "No se pudo conectar con el servidor. Por favor mandar un mail a tomas@escuela-de-arqueria.com.ar",
                type: 'error',
            };
            new PNotify(opts);

        } else if (jqXHR.status === 400) {
            // en este caso hubo algun tipo de error de validacion en el servidor
            // por lo que llamo al errorParser original para que me parsee
            // la respuesta.
            if (originalErrorCallback === null) {
                throw new Error('Falta definir la funcion de originalErrorCallback');
            }
            originalErrorCallback(jqXHR, textStatus, thrownError);

        } else if (jqXHR.status === 500) {
            // me fijo si la respuesta del servidor de error en un JSON o no
            // En funcion de eso, me puedo dar cuenta si era un error del servidor
            // o no
            var isJson = false;
            try {
                JSON.parse(jqXHR.responseText);
                isJson = true;
            } catch (error) {
                // no me interesa hacer nada con ese error especifico.
            }

            if (! isJson) {
                // en este caso paso un error en el servidor, y yo no me lo
                // esperaba. Esto basicamente pasa cuando se esta haciendo el
                // form de submit, se tiene un erro handler (para cuando devuelve
                // un error 400), pero el servidor devolvio un 500 porque hay algo
                // mal en el codigo de python
                var opts = {
                    title: "Error",
                    text: "Ocurrio un error en la pagina. Los developers ya fueron notificados",
                    type: 'error',
                };
                new PNotify(opts);
            } else if (originalErrorCallback === null) {
                // en este caso ocurrio un error de javascript por lo que tengo
                // que mostrar el mensaje de error por pantalla.
                var opts = {
                    title: "Error",
                    text: "Ocurrio un error en la pagina. Los developers ya fueron notificados",
                    type: 'error',
                };
                new PNotify(opts);
            } else {
                // en este caso ocurrio un error del servidor, pero el que lo llamo
                // asumia que esto era posible
                originalErrorCallback(jqXHR, textStatus, thrownError);
            }
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
     *
     *
     * @param {Function} errorCallback: el callback que se va a usar en caso de
     *                                  hubo un error de validacion cuando se hizo
     *                                  el request.
     */
    ajaxCall: function(url, data, type, successCallback, errorCallback) {
        if (! successCallback) {
            throw new Error('Te falto el successCallback');
        }
        $.ajax({
            type: type,
            url: '/api/v01/' + url,
            data: data,
            success: successCallback,
            error: $.proxy(this.ajaxError, this, errorCallback || null)
        });
    },

    ajaxCallObject: function(params) {
        return this.ajaxCall(params.url,
                             params.data,
                             params.type,
                             params.successCallback,
                             params.errorCallback);
    }
});
