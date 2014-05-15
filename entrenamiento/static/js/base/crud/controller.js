/**
 * Controller que se encarga de manejar tanto el tema
var CrudController = Class.$extend({

    /**
     * Inicializa la instancia.
     *
     * @param {TableView} tableView: la view que se encarga de mostrar
     *                               todos los resultados de la tabla
     *                               correspondiente.
     *
     * @param {FormController} formController: la view que se encarga de mostrar el
     *                                         form para que el usuario pueda actualizar
     *                                         un valor o para crear uno nuevo.
     *
     * @param {HisotryManager} historyManager: el que se va a encargar de
     *                                         trabajar con todo el tema
     *                                         del historial del browser.
     */
    __init__: function(tableView, formController, historyManager) {
        this.tableView = tableView;
        this.formController = formController;
        this.historyManager = historyManager;
    },


    /**
     * Se encarga de renderar tanto el tableView como el formController.
     *
     * Pero a uno de los dos los va a ocultar teniendo en cuenta si
     * la URL es de una instancia o es generica para ver todas.
     */
    render: function() {
        this.tableView.$element.show();
        this.formController.formView.$elementt.hide();
        this.tableView.render();
    },

    /**
     * Se encarga de mostrar la tabla con toda la informacion
     */
    showTable: function() {
        this.tableView.$element.show();
        this.formController.formView.$elementt.hide();
        this.tableView.getData();
    },

    /**
     * Se encarga de mostrar el form para que el usuario
     * pueda crear una nueva instancia.
     */
    createNew: function() {
        this.tableView.$element.hide();
        this.formController.formView.$elementt.show();
        this.formController.render(null);
    },

    /**
     * Handler de cuando el objeto se creo bien.
     *
     * @param {int} objectId: el id del objeto que fue recien creado.
     */
    createdObject: function(objectId) {
        this.tableView.$element.show();
        this.formController.formView.$elementt.hide();
        this.tableView.createdObject();
    },

    /**
     * Esto es llamado por el table view para que se muestre el
     * form para poder editar el objecto con el id indicado.
     *
     * @param {int} objectId: el id del objeto que se quiere editar.
     */
    editObject: function(objectId) {
        this.tableView.$element.hide();
        this.formController.formView.$elementt.show();
        this.formController.render(objectId);
    },


    /**
     * Llamado desde el APP para que se encargue de manejar todo el tema
     * de mostrar la tabla con toda la informacion.
     *
     * Esta funcion solo se la usa cuando el usuario esta cambiando la parte
     * del historial (haciendo Back o Forward), asique es importante tener
     * en cuenta eso.
     */
    renderTableInformation: function(orderBy, orderDirection, currentPage) {
        this.tableView.orderBy = orderBy;
        this.tableView.orderDirection = orderDirection;
        this.tableView.currentPage = currentPage;

        this.formController.formView.$elementt.hide();
        this.tableView.$element.show();
        this.tableView.addToHistory = false;

        // necesito llamar al render para que cambie todo el tema
        // de los eventos.
        this.tableView.render();
    }
});
