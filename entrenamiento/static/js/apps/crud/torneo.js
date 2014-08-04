/**
 * La APP que se va a usar para poder cargar la informacion del torneo.
 */
var TorneoCrudApplication = BaseCrudApp.$extend({

    __init__: function(element, historyManager, apiManager, databaseInformation) {
        this.$super(element,
                    historyManager,
                    apiManager,
                    databaseInformation,
                    'torneo',
                    ['cuando']);
    },


    createFormController: function() {
        var view = new TorneoFormView(this.$element.find('.form-container'),
                                      this.databaseInformation.getTableColumns('torneo'),
                                      this.fkInformation,
                                      this.databaseInformation.getTableColumns('ronda'),
                                      null);
        var controller = new TorneoFormController(view,
                                                  this.apiManager,
                                                  this);
        return controller;
    }
});
