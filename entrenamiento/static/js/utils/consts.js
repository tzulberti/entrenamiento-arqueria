/**
 * Ciertas constantes que necesito que en el sistema esten mapeados
 * para no poner los valores de los ids fijos.
 */
var consts = {

    // el formato de la fecha en el cual viene la respuesta del servidor
    DATE_RESPONSE_FORMAT: 'DD/MM/YYYY',

    // tiene los ids de cada uno de los estados de los arqueros. Estos
    // estan en una tabla categorica, pero ademas, necesito saber
    // los ids de los mismos por logica del sistema.
    ESTADO_ARQUERO: {
        primer_clase: 1,
        activo: 2,
        pasivo: 3,
        abandono: 4
    }
};
