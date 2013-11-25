/**
 * Clase base que se usa en todas las views para mostrar tanto la tabla
 * con la informacion existente o que muestra el form para que el usuario
 * pueda editar o crear una instancia.
 *
 * Esta es la clase base de la cual extienden todas las views que
 * tienen la parte de crear y de mostrar la informacion.
 */
var CrudView = Class.$extend({

    /**
     * Inicializa la instancia.
     *
     * @param {TableView} tableView: la view que se encarga de mostrar
     *                               todos los resultados de la tabla
     *                               correspondiente.
     *
     * @param {FormView} formView: la view que se encarga de mostrar el
     *                             form para que el usuario pueda actualizar
     *                             un valor o para crear uno nuevo.
     */
    __init__: function(tableView, formView) {
        this.tableView = tableView;
        this.formView = formView;
    },


    /**
     * Se encarga de renderar tanto el tableView como el formView.
     *
     * Pero a uno de los dos los va a ocultar teniendo en cuenta si
     * la URL es de una instancia o es generica para ver todas.
     */
    render: function() {
        if (true) {
            this.tableView.$element.show();
            this.formView.$element.hide();
            this.tableView.render();
        } else {
            this.tableView.$element.hide();
            this.formView.$element.show();
        }
    },

    /**
     * Se encarga de mostrar el form para que el usuario
     * pueda crear una nueva instancia.
     */
    createNew: function() {
        this.tableView.$element.hide();
        this.formView.$element.show();
        this.formView.createNew();
    },

    /**
     * Handler de cuando el objeto se creo bien.
     */
    createdObject: function() {
        this.tableView.$element.show();
        this.formView.$element.hide();
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
        this.formView.$element.show();
        this.formView.editObject(objectId);
    }
});
