/**
 * La applicacion que se encarga de todo el tema del CRUD
 * de los arcos recurvados
 */
var ArcoRecurvadoCrudApplication = FieldCrudApp.$extend({

    __init__: function(element, historyManager, apiManager, databaseInformation) {
        var formFields = [
            new FormFieldData('nombre', null),
            new FormFieldData('comentario', null),
            new FieldsetFieldData('Riser', true),
                new FormFieldData('marca_riser', null),
                new FormFieldData('modelo_riser', null),
                new FormFieldData('largo_riser', null),
                new FormFieldData('tipo_encastre', null),
            new FieldsetFieldData('Riser', false),

            new FieldsetFieldData('Palas', true),
                new FormFieldData('marca_palas', null),
                new FormFieldData('modelo_palas', null),
                new FormFieldData('largo_palas', null),
                new FormFieldData('libraje_palas', 'El libraje de las mismas segun la fabrica.'),
                new FormFieldData('libraje_real', 'El libraje que uno tiene teniendo en cuenta su apertura'),
            new FieldsetFieldData('Palas', false),

            new FieldsetFieldData('Otras cosas', true),
                 new FormFieldData('marca_mira', null),
                 new FormFieldData('modelo_mira', null),
                 new FormFieldData('modelo_clicker', null),
                 new FormFieldData('modelo_rest', null),
                 new FormFieldData('modelo_cushion_plunger', null),
            new FieldsetFieldData('', false),
            new FieldsetFieldData('Barra Principal', true),
                 new FormFieldData('modelo_barra_larga_estabilizacion', null),
                 new FormFieldData('largo_barra_larga_estabilizacion', null),
                 new FormFieldData('peso_adicional_barra_larga', null),
            new FieldsetFieldData('', false),
            new FieldsetFieldData('V-Bar / Extender', true),
                 new FormFieldData('modelo_vbar_estabilizacion', null),
                 new FormFieldData('modelo_extender_estabilizacion', null),
                 new FormFieldData('largo_extender_estabilizacion', null),
            new FieldsetFieldData('', false),
            new FieldsetFieldData('Barras Laterales', true),
                 new FormFieldData('modelo_barra_lateral_estabilizacion', null),
                 new FormFieldData('largo_barra_lateral_estabilizacion', null),
                 new FormFieldData('peso_adicional_barra_lateral', null),
            new FieldsetFieldData('', false),

        ];
        this.$super(element, historyManager, apiManager, databaseInformation,
                    'arco_recurvado', ['nombre', 'marca_riser', 'marca_palas'], formFields);
    }
});

