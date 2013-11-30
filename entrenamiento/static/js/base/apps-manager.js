/**
 * El manager que se encarga de mostrar la app correspondiente a la URL
 * que ingreso el usuario o teniendo en cuenta la opcion que selecciono
 * el mismo.
 */
var AppsManager = Class.$extend({

    __init__: function() {
        this.applications = {};
    },


    /**
     * Se encarga de registar una nueva aplicacion teniendo en cuenta
     * cuales son las opciones del menu que el usuario puede llegar
     * a ver.
     *
     * @param {int} applicationId: el id de la applicacion que la identifica
     *                             del resto.
     *
     * @param {Application} application: la applicacion que se encarga de manejar
     *                                   todo lo que el usuario va a ver.
     */
    addApplication: function(applicationId, application) {
        this.applications[applicationId] = application;
    },

    /**
     * Se encarga de iniciar la aplicacion que esta viendo el usuario teniendo
     * en cuenta todas las opciones posibles del menu.
     *
     * @param {int} applicationId: el identificador de la applicacion que el
     *                             usuario quiere ver.
     */
    useApplication: function(applicationId) {
        var application = this.applications[applicationId];
        application.start();
    }
});

