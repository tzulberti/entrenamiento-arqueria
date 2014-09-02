/**
 * Se encarga de escuchar los errores que pueden pasar en el lado de JS,
 * y en caso de que haya un error lo notifica al servidor.
 */

/**
 * Se encarga de notificarle al servidor de que hubo un error de JS y toda
 * la informacion que se tiene del mismo.
 */
window.onerror = function(errorMessage, url, lineNumber, columnNumber, error) {
    var data = {
        errorMessage: errorMessage,
        url: url,
        lineNumber: lineNumber
    };
    if (columnNumber) {
        data['columnNumber'] = columnNumber;
    }
    if (error) {
        data['stacktrace'] = error.stack;
    }
    var csrftoken = $('meta[name=csrf-token]').attr('content')
    $.ajax({
        beforeSend: function(xhr, settings) {
            if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type)) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken)
            }
        },
        type: 'POST',
        url: '/api/v01/javascript-error/',
        data: data,
        success: _onErrorAjaxCallback,
        error: _onErrorAjaxCallback
    });

    var opts = {
        title: "Error",
        text: "Ocurrio un error en la pagina. Los developers ya fueron notificados",
        type: 'error',
    };
    new PNotify(opts);

};

function _onErrorAjaxCallback(){
}
