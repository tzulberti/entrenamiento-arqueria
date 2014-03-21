/**
 * La applicacion que se encarga de todo el tema del CRUD
 * de arcos recurvados
 */
var ArcosRecurvadosCrudApplication = BaseTemplateCrudApp.$extend({

    __init__: function(historyManager, element) {
        var formTemplate = $("#arco-recurvado-form-handlebars-template").html();
        var columnNames = [
            'nombre',
            'modelo_riser',
            'modelo_palas'
        ];
        this.$super(historyManager, 'arco-recurvado', formTemplate, element, columnNames);
    }
});


