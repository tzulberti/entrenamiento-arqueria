/**
 * Tiene toda la informacion sobre los diferentes torneos en el
 * los que puede participar el tirador.
 */
var TipoTorneos = Class.$extend({

    /**
     * Tiene toda la informacion sobre los distintos
     * tipos de torneos.
     */
    __init__: function() {
        this.data = [
            {
                id: 1,
                nombre: '18m',
                tipo: 'Indoor',
                numeroDeFlechas: 3,
                numeroDeSeries: 10,
                rondas: [
                    {
                        distancia: 18,
                        seriesDePractica: 2
                    },
                    {
                        distancia: 18,
                        seriesDePractica: 0
                    }
                ]
            },
            {
                id: 2,
                nombre: '25m',
                tipo: 'Indoor',
                numeroDeSeries: 10,
                numeroDeFlechas: 3,
                rondas: [
                    {
                        distancia: 25,
                        seriesDePractica: 2
                    },
                    {
                        distancia: 25,
                        seriesDePractica: 0
                    }
                ]
            },
            {
                id: 3,
                nombre: '1440 Senior Masculino',
                tipo: 'Fita 1440',
                numeroDeSeries: 6,
                numeroDeFlechas: 6,
                rondas: [
                    {
                        distancia: 90,
                        seriesDePractica: 2
                    },
                    {
                        distancia: 70,
                        seriesDePractica: 2
                    },
                    {
                        distancia: 50,
                        seriesDePractica: 2
                    },
                    {
                        distancia: 30,
                        seriesDePractica: 2
                    }
                ]
            },
            {
                id: 4,
                nombre: '1440 Senior Femenino',
                tipo: 'Fita 1440',
                numeroDeSeries: 6,
                numeroDeFlechas: 6,
                rondas: [
                    {
                        distancia: 70,
                        seriesDePractica: 2
                    },
                    {
                        distancia: 60,
                        seriesDePractica: 2
                    },
                    {
                        distancia: 50,
                        seriesDePractica: 2
                    },
                    {
                        distancia: 30,
                        seriesDePractica: 2
                    }
                ]
            },
            {
                id: 5,
                nombre: '1440 50-50-30-30',
                tipo: 'Fita 1440',
                numeroDeSeries: 6,
                numeroDeFlechas: 6,
                rondas: [
                    {
                        distancia: 50,
                        seriesDePractica: 2
                    },
                    {
                        distancia: 50,
                        seriesDePractica: 2
                    },
                    {
                        distancia: 30,
                        seriesDePractica: 2
                    },
                    {
                        distancia: 30,
                        seriesDePractica: 2
                    }
                ]
            },
            {
                id: 6,
                nombre: '1440 30-30-20-20',
                tipo: 'Fita 1440',
                numeroDeSeries: 6,
                numeroDeFlechas: 6,
                rondas: [
                    {
                        distancia: 30,
                        seriesDePractica: 2
                    },
                    {
                        distancia: 30,
                        seriesDePractica: 2
                    },
                    {
                        distancia: 20,
                        seriesDePractica: 2
                    },
                    {
                        distancia: 20,
                        seriesDePractica: 2
                    }
                ]
            },
            {
                id: 7,
                nombre: '70-70',
                tipo: 'Fita 70-70',
                numeroDeSeries: 6,
                numeroDeFlechas: 6,
                rondas: [
                    {
                        distancia: 70,
                        seriesDePractica: 2
                    },
                    {
                        distancia: 70,
                        seriesDePractica: 0
                    }
                ]
            },
            {
                id: 8,
                nombre: '60-60',
                tipo: 'Fita 70-70',
                numeroDeSeries: 6,
                numeroDeFlechas: 6,
                rondas: [
                    {
                        distancia: 60,
                        seriesDePractica: 2
                    },
                    {
                        distancia: 60,
                        seriesDePractica: 0
                    }
                ]
            },
            {
                id: 9,
                nombre: '50-50',
                tipo: 'Fita 70-70',
                numeroDeSeries: 6,
                numeroDeFlechas: 6,
                rondas: [
                    {
                        distancia: 50,
                        seriesDePractica: 2
                    },
                    {
                        distancia: 50,
                        seriesDePractica: 0
                    }
                ]
            },
            {
                id: 10,
                nombre: '30-30',
                tipo: 'Fita 70-70',
                numeroDeSeries: 6,
                numeroDeFlechas: 6,
                rondas: [
                    {
                        distancia: 30,
                        seriesDePractica: 2
                    },
                    {
                        distancia: 30,
                        seriesDePractica: 0
                    }
                ]
            },
            {
                id: 11,
                nombre: '20-20',
                tipo: 'Fita 70-70',
                numeroDeSeries: 6,
                numeroDeFlechas: 6,
                rondas: [
                    {
                        distancia: 20,
                        seriesDePractica: 2
                    },
                    {
                        distancia: 20,
                        seriesDePractica: 0
                    }
                ]
            }
        ]
    },


    /**
     * Ordena los valores de forma tal que en los templates siempre
     * se los muestre de la misma forma.
     *
     * Primero se van a mostrar los inddor, despues los 70-70,
     * y por ultimo los 1440.
     */
    ordenarForTemplate: function() {
        return [
            {
                groupLabel: 'Indoor',
                tipoTorneos: [
                    this.getById(1),
                    this.getById(2)
                ]
            },
            {
                groupLabel: 'Outdoor 70-70',
                tipoTorneos: [
                    this.getById(7),
                    this.getById(8),
                    this.getById(9),
                    this.getById(10),
                    this.getById(11),
                ]
            },
            {
                groupLabel: 'Outdoor 1440',
                tipoTorneos: [
                    this.getById(3),
                    this.getById(4),
                    this.getById(5),
                    this.getById(6),
                ]
            }
        ]
    },

    /**
     * Devuelve la informacion del torneo que tenga el id correspondiente.
     *
     * @parm {int} id: el id del tipo de torneo del cual se quiere buscar la
     *                 informacion.
     *
     * @return {Object} toda la informacion del tipo de torneo.
     */
    getById: function(id) {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                return this.data[i];
            }
        }
        throw new Error('Se pidio la informacion de un torneo que no existe');
    }
})



