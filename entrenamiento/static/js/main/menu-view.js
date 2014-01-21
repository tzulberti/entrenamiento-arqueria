/**
 * View que se encarga de usar la applicacion correspondiente a la opcion
 * que selecciono el usuario.
 */
var MainMenuView = Class.$extend({

    /**
     * Creates the instance.
     *
     * @param {jQuery} element: el elemento del DOM que tiene el menu con las
     *                          diferentes opciones que puede seleccionar el usuario.
     *
     * @param {ApplicationManager} appsManager: el manager que tiene registradas todas
     *                                          las applicaciones que se pueden usar en la
     *                                          página.
     */
    __init__: function(element, appsManager) {
        this.$element = element;
        this.appsManager = appsManager;
    },

    /**
     * Registra el evento de escuchar una de las opciones que se eligen del
     * menu principal de la aplicacion.
     */
    render: function() {
        this.$element.off('click', '.menu-option');
        this.$element.on('click', '.menu-option', $.proxy(this.chosenMenuOption, this));
    },

    /**
     * Handler de cuando el usuario selecciona una de las opciones del
     * menu principal
     */
    chosenMenuOption: function(ev) {
        ev.preventDefault();

        var target = $(ev.target);
        var applicationId = target.attr('id');
        applicationId = applicationId.replace('application-', '');
        applicationId = parseInt(applicationId, 10);
        this.appsManager.useApplication(applicationId);
    }

});


