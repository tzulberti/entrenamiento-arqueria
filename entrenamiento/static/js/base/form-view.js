/**
 * View basica que se encarga de todo el tema del form cuando el usuario quiere
 * ver el detalle, editar, o crear una instancia del objeto.
 *
 * .. note: Esta clase es una clase abstracta por lo que la misma tiene que
 *          ser extendida e implementada para los diferentes casos.
 */
var BaseFormView = Class.$extend({

    __init__: function(element) {
        this.$element = element;
    },

    /**
     * Se encarga de renderar el form en la ventana correspondiente.
     */
    renderForm: function() {
        this.$element.empty();
        this.$element.html(this.renderBaseHtml());

        this.$element.find('textarea').cleditor({
            controls: "bold italic underline | " +
                      "font size | "  +
                      "color highlight | " +
                      "alignleft center alignright justify | " +
                      "bullets numbering"
        });

        this.$element.off('click', '.button-save');
        this.$element.on('click', '.button-save', $.proxy(this.saveInformation, this));
    },

    /**
     * Se encarga de obtener el html que se tiene que mostrar del form,
     * cuando el mismo esta vacio.
     */
    renderBaseHtml: function() {
        throw new Error('Se tiene que implementar este metodo');
    },

    /**
     * Llamado por el CrudView cuando el usuario quiere crear una nueva instancia
     * del objeto.
     */
    createNew: function() {
        this.objectId = null;
        // esto ese va a ocupar de borrar todos los datos del form
        // anterior si es que habia...
        this.renderForm();
    },

    saveInformation: function(ev) {
        throw new Error('Se tiene que implementar este metodo');
    },

    editObject: function(objectId) {
        throw new Error('SE tiene que implementar este metodo');
    }



});

/**
 * View que se encarga de renderar el form para el usuario.
 *
 * La msima se encarga de renderar el form con todos los campos necesarios,
 * y de hacer el subimit mediante ajax. En caso de que haya algun error,
 * tambien va a ser el encargado de mostrarle los errores por pantalla
 * al usuario.
 */
var TemplateFormView = BaseFormView.$extend({

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
    __init__: function(element, formTemplate, modelName) {
        this.$super(element);
        this.formTemplate = formTemplate;
        this.modelName = modelName;
    },

    /**
     * Se encarga de obtener el html que se tiene que mostrar del form,
     * cuando el mismo esta vacio.
     */
    renderBaseHtml: function() {
        var html = Handlebars.render(this.formTemplate, {});
        return html;
    },


    /**
     * Se encarga de buscar el objecto en cuestion en la base de datos,
     * y en funcion del mismo, llenar todos los datos del formulario.
     *
     * @param {int} objectId: el id del objecto que el usuario quiere cargar
     *                        de la base de datos.
     */
    editObject: function(objectId) {
        var self = this;
        this.objectId = objectId;
        this.renderForm();
        this.$element.find('form').mask('Loading');
        $.ajax({
            type: 'GET',
            url: consts.BASE_API_URL + this.modelName + '/' + objectId + '/',
            success: function(responseData, text, jqXHR) {
                utils.renderFormData(self.$element,
                                     responseData,
                                     '');
                self.$element.unmask();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Algo salio mal');
            }
        });
    },

    /**
     * Handler de cuando el usuario hace click para guardar todos los cambios
     * que hizo el mismo.
     */
    saveInformation: function(ev) {
        ev.stopPropagation();
        ev.preventDefault();

        var httpMethod = '';
        var url = this.modelName + '/';
        var data = this.$element.find('form').serializeObject();
        this.$element.mask('Saving');
        if (this.objectId === null) {
            httpMethod = 'POST';
        } else {
            httpMethod = 'PUT';
            url += this.objectId + '/';
            data.id = this.objectId;
        }

        var self = this;
        $.ajax({
            type: httpMethod,
            url: consts.BASE_API_URL + url,
            data: data,
            success: function(responseData, text, jqXHR) {
                self.crudView.createdObject(responseData.id);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // tengo que borrar todos los errores anteriores...
                self.$element.find('.form-group').removeClass('has-error');
                self.$element.find('.error-message').remove();
                self.$element.unmask();

                var formErrors = JSON.parse(jqXHR.responseText);
                for (var fieldName in formErrors) {
                    var formElement = self.$element.find('input[name=' + fieldName + ']');
                    var formGroupElement = formElement.parents('.form-group');
                    formGroupElement.addClass('has-error');
                    formElement.after('<span class="help-block error-message">' + formErrors[fieldName] + '</span>');
                }

            }
        });
    }
});
