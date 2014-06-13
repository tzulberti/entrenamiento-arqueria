/**
 * Controller que se encarga de manejar el form para que el usuario
 * cree/edite data de la base de datos.
 */
var FormController = Class.$extend({

    /**
     * Constructor.
     *
     * @param {FormView} formView: la view que esta asociada al controller en cuestion.
     *
     * @param {ApiManager} apiManager: el manager que se usa para hacer todos los
     *                                 request ajax.
     *
     * @param {String} tableName: el nombre de la tabla para la cual se quiere grabar
     *                            un nuevo valor.
     *
     * @param {String} urlPekeUpload: la URL a donde se tiene que subir el archivo
     *                                en caso de que el form tenga un input de path.
     *
     * @param {CrudView} crudView: la view que se tiene que notificar cuando el objeto
     *                             fue creado.
     */
    __init__: function(formView, apiManager, tableName, urlPekeUpload, crudView) {
        this.formView = formView;
        this.apiManager = apiManager;
        this.tableName = tableName;
        this.urlPekeUpload = urlPekeUpload;
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
                successCallback: $.proxy(this.gotObjectInformation, this)
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

        var self = this;
        if (this.formView.$element.find('input:file').exists()) {
            var elem = this.formView.$element.find('input:file');
            elem.pekeUpload({
                showFilename: false,
                showPercent: false,
                onSubmit: false,
                theme: "bootstrap",
                multi: true,
                url: '/api/v01/' + this.urlPekeUpload,
                onFileSuccess: $.proxy(this.handleUploadedFile, this, elem)
            });

        }

        this.formView.$element.find('.button-save').on('click', $.proxy(this.saveInformation, this));
    },

    /**
     * Handler de cuando un archivo se pudo subir bien.
     *
     * @param {jQuery} element: el elemento que esta siendo usado por pekeUpload.
     *
     * @param {Object} file: tiene informacion sobre el archivo subido.
     *
     * @param {Object} data: tiene otra informacion sobre el archivo que se subio.
     */
    handleUploadedFile: function(element, file, data) {
        var columnName = element.attr('name');
        columnName = columnName.replace('_upload', '');
        var hiddenElement = this.formView.$element.find('#' + columnName);
        if (! hiddenElement.exists()) {
            throw new Error('Algo esta mal configurado porque no se encuentra el hidden element');
        }

        hiddenElement.val(data.filename);
        this.formView.$element.find('#' + columnName + '_existing').html(
                '<a href="/uploads/' + data.filename + '/"><img src="/uploads/' + data.thumb_filename + '/"></a>');
        // porque hay un bug cuando pongo multi en True, y que
        // no muestre la barra
        this.formView.$element.find('.file').clean();
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
