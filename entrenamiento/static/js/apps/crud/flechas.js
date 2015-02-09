/**
 * La applicacion que se encarga de todo el tema del CRUD
 * de pagos
 */
var FlechasCrudApplication = FieldCrudApp.$extend({

    __init__: function(element, historyManager, apiManager, databaseInformation) {
        var formFields = [
            new FormFieldData('id_tipo_uso', null),
            new FormFieldData('id_marca_flechas', null),
            new FormFieldData('id_modelo_flechas', null),
            new FormFieldData('calibre_flechas', 'En el caso de las flechas de carbono es un numero (660). En el caso de las jazz son dos numeros juntos (1913)'),
            new FormFieldData('punta', 'El peso de la punta en grames. Si es una punta de jazz o Plantinum, entonces es el calibre de la punta (1913)'),
            new FormFieldData('largo', 'El largo de las flecha en pulgadas'),
            new FormFieldData('info_nock', 'Toda la informacion del nock. Por ejemplo: Beiter IN-OUT 2x95-S1 Verde'),
            new FormFieldData('info_timones', 'Toda la informacion de los timones. Por ejemplo: Kurly Vanes Verdes Homologados 45mm'),
        ];
        this.$super(element, historyManager, apiManager, databaseInformation,
                    'flechas',
                    ['id_usuario', 'id_marca_flechas', 'id_modelo_flechas'],
                    formFields,
                    null);
    }
});

