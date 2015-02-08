/**
 * La aplicacion principal que se encarga de registrar todas las
 * otras subaplicaciones del sistema.
 *
 * Esta es la aplicacion que se inicializa desde el html, y la misma
 * se encarga de inicializar todas las otras
 */
var MainApplication = Class.$extend({

    __init__: function() {
        this.databaseInformation = new DatabaseInformation();
        this.appsManager = new AppsManager();
        this.historyManager = new HistoryManager();
        this.apiManager = new APIManager();

        this.menuView = null;
    },

    /**
     * Se encarga de hacer el llamado Ajax para cargar toda la estructura
     * de la base de datos que el usuario esta viendo.
     */
    start: function() {
        $.ajax({
            type: 'GET',
            url: '/api/v01/database-information/',
            success: $.proxy(this.gotDatabaseInformation, this)
        });
    },

    /**
     * Handler de cuando se pudo obtener toda la informacion del schema
     * de la base de datos.
     */
    gotDatabaseInformation: function(data, textStatus, jqXHR) {
        this.databaseInformation = new DatabaseInformation();
        this.databaseInformation.parseResponse(data.res);

        this.registerCrudApplication(LugarCrudApplication, 1, 'lugarCrudApp', 'lugar');
        this.registerCrudApplication(ArcoRecurvadoCrudApplication, 3, 'arcoRecuvadoCrudApp', 'arco_recurvado');
        this.registerCrudApplication(InvitacionCrudApplication, 5, 'invitacionCrudApp', 'invitacion');
        this.registerCrudApplication(TorneoCrudApplication, 4, 'torneoCrudApp', 'torneo');
        this.registerCrudApplication(PagoCrudApplication, 6, 'pagoCrudApp', 'pago');
        this.registerCrudApplication(ArqueroCrudApplication, 8, 'arqueroCrudApp', 'arquero');
        this.registerCrudApplication(TurnoCrudApplication, 9, 'turnoCrudApp', 'turno');
        this.registerCrudApplication(AsistenciaCrudApplication, 10, 'asistenciaCrudApp', 'asistencia');
        this.registerCrudApplication(HistoriaEstadoArqueroCrudApplication, 11, 'historiaEstadoArqueroCrudApp', 'historia_estado_arquero');
        this.registerCrudApplication(EntrenamientoRealizadoCrudApplication, 13, 'entrenamientoRealizadoCrudApp', 'entrenamiento_realizado');
        this.registerCrudApplication(GastoCrudApplication, 2, 'gastoCrudApp', 'gasto');
        this.registerCrudApplication(FlechasCrudApplication, 14, 'flechasCrudApp', 'flechas');
        this.registerCrudApplication(FechaEspecialCrudApplication, 44, 'fechaEspecialCrudAPP', 'fecha_especial');
        this.registerCrudApplication(PermisoUsuarioCrudApplication, 99, 'permisoUsuarioCrudAPP', 'permiso_usuario');
        this.registerCrudApplication(UsuarioCrudApplication, 45, 'usuarioCrudAPP', 'usuario');

        // ahora registro todo el tema relacionados a los graficos
        this.registerGraficsApplication(PagosAcumuladosGraficoApp, 10001, 'pagosAcumuladosGraficoApp');
        this.registerGraficsApplication(PagosPorMesGraficoApp, 10002, 'pagosPorMesGraficoApp');
        this.registerGraficsApplication(CantidadEstadosPorMesGraficoApp, 10101, 'cantidadEstadosPorMesGraficoApp');
        this.registerGraficsApplication(CantidadAsistenciasGraficoApp, 10102, 'cantidadAsistenciasGraficoApp');
        this.registerGraficsApplication(MapaUsuariosGraficoApp, 10103, 'mapaUsuariosGraficoApp');
        this.registerGraficsApplication(FlechasAcumuladasGraficoApp, 10201, 'flechasAcumuladasGraficoApp');

        this.menuView = new MainMenuView($("#side-menu"),
                                         this.appsManager);
        this.menuView.render();

        $('#side-menu').metisMenu();
    },


    /**
     * Se necarga de crear una app para los CRUD, setearla a este objecto, y
     * registrarla en el appsManager.
     *
     * @param {Class} crudAppClass: la clase (no la instancia que se tiene que
     *                              usar para crear la instancia.
     *
     * @param {Number} id: el identificador de la aplicacion que se tiene que usar
     *                     para la aplicacion de graficos.
     *
     * @param {String} attributeName: el nombre del atributo de la instancia de
     *                                la app de graficos en esta aplicacion.
     */
    registerCrudApplication: function(crudAppClass, id, attributeName, modelName) {
        this[attributeName] = new crudAppClass($("#page-wrapper"),
                                               this.historyManager,
                                               this.apiManager,
                                               this.databaseInformation);
        this.appsManager.addApplication(id, this[attributeName]);
        this.historyManager.addApplicationForModel(modelName, this[attributeName]);
    },

    /**
     * Se encarga de crear una app para hacer los graficos, setearsela a esta
     * aplicacion y registrarla en el appsManager.
     *
     * @param {Class} graphicsAppClass: la clase (no la instancia) que se tiene que
     *                                  usar para crear la instancia.
     *
     * @param {Number} id: el identificador de la aplicacion que se tiene que usar
     *                     para la aplicacion de graficos.
     *
     * @param {String} attributeName: el nombre del atributo de la instancia de
     *                                la app de graficos en esta aplicacion.
     */
    registerGraficsApplication: function(graphicsAppClass, id, attributeName) {
        this[attributeName] = new graphicsAppClass($("#page-wrapper"),
                                                   this.historyManager,
                                                   this.apiManager,
                                                   this.databaseInformation);
        this.appsManager.addApplication(id, this[attributeName]);
    }


});
