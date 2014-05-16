/**
 * Controller que se encarga de manejar el form para que el usuario
 * cree/edite data de la base de datos.
 */
var FormController = Class.$extend({

    __init__: function(formView, apiManager, tableName, crudView) {
        this.formView = formView;
        this.apiManager = apiManager;
        this.tableName = tableName;
        this.crudView = crudView;
        this.objectId = null;
    },

    /**
     * Se encarga de renderar la informacion para el id especificado.
     *
     * @param {int} objectId: el id del objecto que el usuario esta editando.
     *                        En caso de que este creando, entonces este
     *                        valor va a ser null.
     */
    render: function(objectId) {
        this.objectId = objectId;
        this._renderForm(null, null);
        if (objectId === null) {
            return;
        } else {
            this.formView.$element.mask('Loading');
            this.apiManager.ajaxCallObject({
                url: this.tableName + '/' + objectId + '/',
                data: {},
                type: 'GET',
                succesCallback: $.proxy(this.gotObjectInformation, this)
            });
        }
    },

    /**
     * Handler de cuando se obtiene la respuesta del servidor sobre el
     * objeto que se esta editando.
     */
    gotObjectInformation: function(responseData, textStatus, jqXHR) {
        this.formView.$element.unmask();
        this._renderForm(responseData, null);
    },

    _renderForm: function(objectData, validationErrors) {
        this.formView.render(objectData, validationErrors);

        this.formView.$element.on('click', '.button-save', $.proxy(this.saveInformation, this));
    },

    /**
     * Handler de cuando hace click en el boton de guardar.
     */
    saveInformation: function (ev) {
        ev.stopPropagation();
        ev.preventDefault();

        var httpMethod = '';
        var url = this.tableName + '/';
        var data = this.formView.$element.find('form').serializeObject();
        this.formView.$element.mask('Saving');
        if (this.objectId === null) {
            httpMethod = 'POST';
        } else {
            httpMethod = 'PUT';
            url += this.objectId + '/';
            data.id = this.objectId;
        }

        this.apiManager.ajaxCallObject({
            url: url,
            type: httpMethod,
            data: data,
            successCallback: $.proxy(this.savedInformation, this),
            errorCallback: $.proxy(this.errorSavingInformation, this)
        });
    },

    /**
     * Handler de cuando se hizo el llamado ajax, y el mismo devolvio
     * la informaicon correctamente.
     */
    savedInformation: function(response, textStatus, jqXHR) {
        this.crudView.createdObject(response.id);
    },

    /**
     * Handler de cuando hubo un error al guardar la informacion en la
     * base de datos.
     */
    errorSavingInformation: function(jqXHR, textStatus, errorThrown) {
        this.formView.$element.unmask();
        var validationErrors = JSON.parse(jqXHR.responseText);
        var data = this.formView.$element.find('form').serializeObject();
        this._renderForm(data, validationErrors);
    }
});
