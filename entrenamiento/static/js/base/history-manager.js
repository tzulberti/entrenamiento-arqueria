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

        window.addEventListener('popstate', $.proxy(this.returnedToPreviousState, this));
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
        if (ev.state === null) {
            return;
        }

        var application = this.applications[ev.state.modelName];
        application.start($.proxy(this.renderTableInformation, this, application, ev));

        if (ev.state.type === 'table') {
            application.renderTableInformation(ev.state.orderBy,
                                               ev.state.orderDirection,
                                               ev.state.currentPage);

        } else if (ev.state.type === 'form') {
            var application = this.applications[ev.state.modelName];
            application.renderForm(ev.state.objectId);
        }
    },

    renderTableInformation: function(application, ev) {
            application.renderTableInformation(ev.state.orderBy,
                                               ev.state.orderDirection,
                                               ev.state.currentPage);
    },


    /**
     * Se encarga de agregar al historial la informacion sobre la tabla
     * que esta viendo el usuario.
     *
     * @param {String} modelName: el nombre del modelo que el usuario esta viendo.
     *                            Se tiene que tener una applicacion asociada a
     *                            este modelo.
     *
     * @param {String} orderBy: la columna por la que el usuario esta viendo
     *                          toda la informacion.
     *
     * @param {String} orderDirection: la direccion en la que se esta ordenando
     *                                 toda la informacion.
     *
     * @param {int} currentPage: la pagina actual que esta viendo el usuario de la
     *                           tabla teniendo en cuenta la cantidad de info.
     */
    pushNewTableStatus: function(modelName, orderBy, orderDirection, currentPage) {
        var url = '#/table/' + modelName + '/' + orderBy + '/' + orderDirection + '/' + currentPage + '/';
        var stateData = {
            type: 'table',
            modelName: modelName,
            orderBy: orderBy,
            orderDirection: orderDirection,
            currentPage: currentPage
        }
        history.pushState(stateData, null, url);
    },


    /**
     * Se encarga de agregar al history un nuevo estado que indica que el usuario
     * quiere ver una nueva instancia o que quiere crear una nueva.
     *
     * @param {String} modelName: el nombre del modelo que el usuario esta creando
     *                            o editando.
     *
     * @param {int} objectId: el identificador de la instancia que el usuario este
     *                        editando. En caso de que este creando, este valor
     *                        va a ser null.
     */
    pushNewInstanceStatus: function(modelName, objectId) {
        var url = '#/instance/' + modelName + '/' + objectId + '/';
        var stateData = {
            type: 'form',
            modelName: modelName,
            objectId: objectId
        };

        history.pushState(stateData, null, url);
    }

});
