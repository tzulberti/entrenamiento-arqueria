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
    __init__: function(element, formTemplate, modelName) {
        this.$element = element;
        this.formTemplate = formTemplate;
        this.modelName = modelName;
    },

    /**
     * Se encarga de renderar el form en la ventana correspondiente.
     */
    renderForm: function() {
        var html = Handlebars.render(this.formTemplate, {});
        this.$element.html(html);

        this.$element.off('click', '.button-save');
        this.$element.on('click', '.button-save', $.proxy(this.saveInformation, this));
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
        $.ajax({
            type: 'GET',
            url: consts.BASE_API_URL + this.modelName + '/' + objectId + '/',
            success: function(responseData, text, jqXHR) {
                for (attributeName in responseData) {
                    var inputField = self.$element.find('input[name=' + attributeName + ']');
                    var value = responseData[attributeName];
                    if (inputField.attr('type') === 'text') {
                        inputField.val(value);
                    } else if (inputField.attr('type') === 'checkbox') {
                        if (value === 1 || value) {
                            inputField.prop('checked', true);
                        } else {
                            inputField.prop('checked', false);
                        }
                    }
                }
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

                var formErrors = JSON.parse(jqXHR.responseText);
                for (var fieldName in formErrors) {
                    var formElement = self.$element.find('input[name=' + fieldName + ']');
                    var formGroupElement = formElement.parents('.form-group');
                    formGroupElement.addClass('has-error');
                    formElement.after('<span class="help-block error-message">' + formErrors[fieldName] + '</span>');
                }
            }
        })
    }
});
