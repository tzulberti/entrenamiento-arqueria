/**
 * View que se encarga de renderar el form para el usuario.
 *
 * La msima se encarga de renderar el form con todos los campos necesarios,
 * y de hacer el subimit mediante ajax. En caso de que haya algun error,
 * tambien va a ser el encargado de mostrarle los errores por pantalla
 * al usuario.
 */
var FormView = Class.$extend({

    /**
     * Inicializa la instancia.
     *
     * @param {jQuery} element: el elemento de jQuery del DOM en donde se
     *                          se tiene que mostrar el elemento.
     *
     * @param {str} formTemplate: el template con toda la data del form
     *                            que se va a popular cuando el usuario
     *                            esta creando o editando una nueva instancia.
     *
     *
     * @param {str} modelName: el nombre del modelo que el usuario esta crenado.
     *
     *
     * @param {int} idToEdit: en caso de que este editando es el id de la instancia
     *                        que el usuario quiere editar. En caso contrario,
     *                        cuando esta creando, este valor es Null.
     */
    __init__: function(element, formTemplate, modelName, idToEdit) {
        this.$element = element;
        this.formTemplate = formTemplate;
        this.modelName = modelName;
        this.idToEdit = idToEdit;
    },

    /**
     * Se encarga de renderar el template teniendo en cuenta si antes
     * tiene que buscar la instancia que el usuario quiere editar
     * por pantalla.
     *
     */
    render: function() {
        if (this.idToEdit !== null) {
        } else {
            this.renderForm();
        }
    },


    /**
     * Se encarga de renderar el form en la ventana correspondiente.
     */
    renderForm: function() {
        var html = Handlebars.render(this.formTemplate, {});
        this.$element.html(html);
    }
});
