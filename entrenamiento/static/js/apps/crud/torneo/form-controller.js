/**
 * El controller que se usa para editar/crear la informacion del resultado de un
 * torneo
 */
var TorneoFormController = FormController.$extend({

    __init__: function(formView, apiManager, crudView) {
        this.$super(formView, apiManager, 'torneo', 'upload/torneo/', crudView);
    },

    _renderForm: function(objectData, validationErrors) {
        this.formView.renderTorneoInformation(objectData, validationErrors);

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

});
