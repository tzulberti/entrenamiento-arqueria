/**
 * Se encarga de manejar todo el tema relacionado al history
 * de lo que estaba viendo el usuario.
 */
var HistoryManager = Class.$extend({

    /**
     * Inicializa la instancia.
     */
    __init__: function() {
        this.applications = {};

        window.addEventListener('popstate', $.proxy(this.returnedToPreviousState));
    },

    /**
     * Agrega la aplicacion en base al modelo que esta viendo el usuario para
     * poder asi usarla cuando el usuario vuelve en la historia.
     *
     * @param {String} modelName: el nombre del modelo que esta asociado a la
     *                            aplicacion que esta viendo el usuario.
     *
     * @param {object} application: la applicacion que tiene el control sobre
     *                              lo que el usuario esta viendo.
     */
    addApplicationForModel: function(modelName, application) {
        this.applications[modelName] = application;
    },

    /**
     * Handler de cuando el usuario hace click en el boton para ir
     * para atras.
     */
    returnedToPreviousState: function(ev) {
        console.log('Entro aca....');
    },


    pushNewStatus: function(modelName, objectId) {
        url = '#/' + modelName + '/';
        if (objectId !== null) {
            url += objectId + '/';
        }
        history.pushState({modelName: modelName, objectId: objectId}, null, url);
    }

});

var historyManager = new HistoryManager();
