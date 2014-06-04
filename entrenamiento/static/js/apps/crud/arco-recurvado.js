/**
 * La applicacion que se encarga de todo el tema del CRUD
 * de los arcos recurvados
 */
var ArcoRecurvadoCrudApplication = FieldCrudApp.$extend({

    __init__: function(element, historyManager, apiManager, databaseInformation) {
        var formFields = [
            new FormFieldData('nombre', null),
            new FormFieldData('draw', 'El draw que vos tenes en plugadas'),
            new FormFieldData('comentario', null),
            new FieldsetFieldData('Riser', true),
                new FormFieldData('id_marca_riser', null),
                new FormFieldData('modelo_riser', null),
                new FormFieldData('id_largo_riser', null),
                new FormFieldData('id_tipo_encastre', null),
                new FormFieldData('usa_barras_cortas', 'Si usa la estabilizacion que se le pone al riser/palas. No se refiera a las barras laterales'),
            new FieldsetFieldData('Riser', false),

            new FieldsetFieldData('Palas', true),
                new FormFieldData('id_marca_palas', null),
                new FormFieldData('modelo_palas', null),
                new FormFieldData('id_largo_palas', null),
                new FormFieldData('libraje_palas', 'El libraje de las mismas segun la fabrica.'),
                new FormFieldData('libraje_real', 'El libraje que uno tiene teniendo en cuenta su apertura'),
                new FormFieldData('usa_honguitos', null),
            new FieldsetFieldData('Palas', false),

            new FieldsetFieldData('Cuerda', true),
                new FormFieldData('id_tipo_hilo_cuerda', null),
                new FormFieldData('cantidad_hilos_cuerda', null),
                new FormFieldData('largo_cuerda', 'El largo (en cm) de la cuerda cuando la misma no tenia niguna vuelta'),
                new FormFieldData('cantidad_vueltas_cuerda', null),
            new FieldsetFieldData('Cuerda', false),

            new FieldsetFieldData('Otras cosas', true),
                 new FormFieldData('id_marca_mira', null),
                 new FormFieldData('modelo_mira', null),
                 new FormFieldData('usa_peewees', null),
                 new FormFieldData('modelo_clicker', null),
                 new FormFieldData('modelo_rest', null),
                 new FormFieldData('modelo_cushion_plunger', null),
            new FieldsetFieldData('Otras cosas', false),

            new FieldsetFieldData('Barra Principal', true),
                 new FormFieldData('id_marca_barra_larga_estabilizacion', null),
                 new FormFieldData('modelo_barra_larga_estabilizacion', null),
                 new FormFieldData('largo_barra_larga_estabilizacion', null),
                 new FormFieldData('peso_adicional_barra_larga', null),
            new FieldsetFieldData('', false),

            new FieldsetFieldData('Extender', true),
                 new FormFieldData('id_marca_extender_estabilizacion', null),
                 new FormFieldData('modelo_extender_estabilizacion', null),
                 new FormFieldData('largo_extender_estabilizacion', null),
            new FieldsetFieldData('', false),

            new FieldsetFieldData('V-Bar', true),
                 new FormFieldData('modelo_vbar_estabilizacion', null),
                 new FormFieldData('vbar_angulo_apertura', 'La separacion en grados que hay entre las dos barras laterales'),
                 new FormFieldData('vbar_angulo_inclinacion', 'La cantidad de grados que caen las barras laterales'),
            new FieldsetFieldData('', false),

            new FieldsetFieldData('Barras Laterales', true),
                 new FormFieldData('id_marca_barra_lateral_estabilizacion', null),
                 new FormFieldData('modelo_barra_lateral_estabilizacion', null),
                 new FormFieldData('largo_barra_lateral_estabilizacion', null),
                 new FormFieldData('peso_adicional_barra_lateral', null),
            new FieldsetFieldData('', false),

        ];
        this.$super(element, historyManager, apiManager, databaseInformation,
                    'arco_recurvado', ['nombre', 'id_marca_riser', 'id_marca_palas'], formFields);
    }
});

