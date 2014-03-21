/**
 * La applicacion que se encarga de todo el tema del CRUD
 * de arcos recurvados
 */
var ArcosRecurvadosCrudApplication = BaseTemplateCrudApp.$extend({

    __init__: function(historyManager, element) {
        var formTemplate = '' +
            '<form role="form" class="form-horizontal">' +
                '<div class="form-group">' +
                    '<label for="nombre" class="col-sm-2 control-label">Nombre</label>' +
                    '<div class="col-sm-10">' +
                        '<input type="text" name="nombre" id="nombre" class="form-control">' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label for="comentario" class="col-sm-2 control-label">Comentario</label>' +
                    '<div class="col-sm-10">' +
                        '<textarea name="comentario" id="comentario" class="form-control"></textarea>' +
                    '</div>' +
                '</div>' +
                '<fieldset>' +
                    '<legend>Riser</legend>' +
                    '<div class="form-group">' +
                        '<label for="modelo_riser" class="col-sm-2 control-label">Modelo</label>' +
                        '<div class="col-sm-10">' +
                            '<input type="text" name="modelo_riser" id="modelo_riser" class="form-control">' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="largo_riser" class="col-sm-2 control-label">Largo</label>' +
                        '<div class="col-sm-10">' +
                            '<input type="text" name="largo_riser" id="largo_riser" class="form-control">' +
                            '<span class="help-block">El mismo tiene que estar en pulgadas</span>' +
                        '</div>' +
                    '</div>' +
                '</fieldset>' +

                '<fieldset>' +
                    '<legend>Palas</legend>' +
                    '<div class="form-group">' +
                        '<label for="modelo_palas" class="col-sm-2 control-label">Modelo</label>' +
                        '<div class="col-sm-10">' +
                            '<input type="text" name="modelo_palas" id="modelo_palas" class="form-control">' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="largo_palas" class="col-sm-2 control-label">Largo</label>' +
                        '<div class="col-sm-10">' +
                            '<input type="text" name="largo_palas" id="largo_palas" class="form-control">' +
                            '<span class="help-block">El mismo tiene que estar en pulgadas</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="libraje_palas" class="col-sm-2 control-label">Libraje</label>' +
                        '<div class="col-sm-10">' +
                            '<input type="text" name="libraje_palas" id="libraje_palas" class="form-control">' +
                            '<span class="help-block">El libraje de las palas. No el libraje que uno le saca a las mismas.</span>' +
                        '</div>' +
                    '</div>' +
                '</fieldset>' +

                '<fieldset>' +
                    '<legend>Otras cosas</legend>' +
                    '<div class="form-group">' +
                        '<label for="modelo_mira" class="col-sm-2 control-label">Modelo mira</label>' +
                        '<div class="col-sm-10">' +
                            '<input type="text" name="modelo_mira" id="modelo_mira" class="form-control">' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="modelo_clicker" class="col-sm-2 control-label">Modelo clicker</label>' +
                        '<div class="col-sm-10">' +
                            '<input type="text" name="modelo_clicker" id="modelo_clicker" class="form-control">' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="modelo_rest" class="col-sm-2 control-label">Modelo rest</label>' +
                        '<div class="col-sm-10">' +
                            '<input type="text" name="modelo_rest" id="modelo_rest" class="form-control">' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="modelo_cushion_plunger" class="col-sm-2 control-label">Modelo Cushion Plunger</label>' +
                        '<div class="col-sm-10">' +
                            '<input type="text" name="modelo_cushion_plunger" id="modelo_cushion_plunger" class="form-control">' +
                        '</div>' +
                    '</div>' +
                '</fieldset>' +


                '<fieldset>' +
                    '<legend>Barra Principal</legend>' +
                    '<div class="form-group">' +
                        '<label for="modelo_barra_larga_estabilizacion" class="col-sm-2 control-label">Modelo</label>' +
                        '<div class="col-sm-10">' +
                            '<input type="text" name="modelo_barra_larga_estabilizacion" id="modelo_barra_larga_estabilizacion" class="form-control">' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="largo_barra_larga_estabilizacion" class="col-sm-2 control-label">Largo</label>' +
                        '<div class="col-sm-10">' +
                            '<input type="text" name="largo_barra_larga_estabilizacion" id="largo_barra_larga_estabilizacion" class="form-control">' +
                            '<span class="help-block">El mismo tiene que estar en pulgadas</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="peso_adicional_barra_larga" class="col-sm-2 control-label">Peso adicional</label>' +
                        '<div class="col-sm-10">' +
                            '<input type="text" name="peso_adicional_barra_larga" id="peso_adicional_barra_larga" class="form-control">' +
                            '<span class="help-block">Siempre que sea posible usar grames</span>' +
                        '</div>' +
                    '</div>' +
                '</fieldset>' +

                '<fieldset>' +
                    '<legend>VBar / Extender </legend>' +
                    '<div class="form-group">' +
                        '<label for="modelo_vbar_estabilizacion" class="col-sm-2 control-label">Modelo VBar</label>' +
                        '<div class="col-sm-10">' +
                            '<input type="text" name="modelo_vbar_estabilizacion" id="modelo_vbar_estabilizacion" class="form-control">' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="modelo_extender_estabilizacion" class="col-sm-2 control-label">Modelo extender</label>' +
                        '<div class="col-sm-10">' +
                            '<input type="text" name="modelo_extender_estabilizacion" id="modelo_extender_estabilizacion" class="form-control">' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="largo_extender_estabilizacon" class="col-sm-2 control-label">Largo extender</label>' +
                        '<div class="col-sm-10">' +
                            '<input type="text" name="largo_extender_estabilizacion" id="largo_extender_estabilizacion" class="form-control">' +
                            '<span class="help-block">El mismo tiene que estar en pulgadas</span>' +
                        '</div>' +
                    '</div>' +
                '</fieldset>' +

                '<fieldset>' +
                    '<legend>Barras laterales</legend>' +
                    '<div class="form-group">' +
                        '<label for="modelo_barra_lateral_estabilizacion" class="col-sm-2 control-label">Modelo</label>' +
                        '<div class="col-sm-10">' +
                            '<input type="text" name="modelo_barra_lateral_estabilizacion" id="modelo_barra_lateral_estabilizacion" class="form-control">' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="largo_barra_lateral_estabilizacion" class="col-sm-2 control-label">Largo</label>' +
                        '<div class="col-sm-10">' +
                            '<input type="text" name="largo_barra_lateral_estabilizacion" id="largo_barra_lateral_estabilizacion" class="form-control">' +
                            '<span class="help-block">El mismo tiene que estar en pulgadas</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="peso_adicional_barra_lateral" class="col-sm-2 control-label">Peso adicional</label>' +
                        '<div class="col-sm-10">' +
                            '<input type="text" name="peso_adicional_barra_lateral" id="peso_adicional_barra_lateral" class="form-control">' +
                            '<span class="help-block">Siempre que sea posible usar grames</span>' +
                        '</div>' +
                    '</div>' +
                '</fieldset>' +

                '<div class="form-group">' +
                    '<div class="col-sm-10 col-sm-offset-2">' +
                        '<button type="submit" class="btn btn-primary button-save">Grabar</button>' +
                    '</div>' +
                '</div>' +
            '</form>';
        var columnNames = [
            'nombre',
            'modelo_riser',
            'modelo_palas'
        ];
        this.$super(historyManager, 'arco-recurvado', formTemplate, element, columnNames);
    }
});


