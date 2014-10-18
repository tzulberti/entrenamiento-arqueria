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


        // aca van todas las apps relacionadas al tema del CRUD.
        /*
        var crudLugarApp = new LugarApplication(this.historyManager,
                                                this.apiManager,
                                                $('.container'));
        var crudUsuariosApp = new UsuariosCrudApplication(this.historyManager,
                                                          this.apiManager,
                                                          $('.container'));
        var crudArcosRecurvadosApp = new ArcosRecurvadosCrudApplication(this.historyManager,
                                                                        this.apiManager,
                                                                        $('.container'));
        var crudTorneosApp = new TorneosCrudApplication(this.historyManager,
                                                        this.apiManager,
                                                        $('.container'));
        var crudInvitacionApp = new InvitacionCrudApplication(this.historyManager,
                                                              this.apiManager,
                                                              $('.container'));
        */

        var crudLugarApp = new LugarCrudApplication($('#page-wrapper'),
                                                    this.historyManager,
                                                    this.apiManager,
                                                    this.databaseInformation);

        var crudPagoApp = new PagoCrudApplication($('#page-wrapper'),
                                                  this.historyManager,
                                                  this.apiManager,
                                                  this.databaseInformation);
        var invitacionCrudApp = new InvitacionCrudApplication($('#page-wrapper'),
                                                              this.historyManager,
                                                              this.apiManager,
                                                              this.databaseInformation);
        var arcoRecurvadoCrudApp = new ArcoRecurvadoCrudApplication($('#page-wrapper'),
                                                                    this.historyManager,
                                                                    this.apiManager,
                                                                    this.databaseInformation);

        var arqueroCrudApp = new ArqueroCrudApplication($('#page-wrapper'),
                                                        this.historyManager,
                                                        this.apiManager,
                                                        this.databaseInformation);

        var turnoCrudApp = new TurnoCrudApplication($('#page-wrapper'),
                                                    this.historyManager,
                                                    this.apiManager,
                                                    this.databaseInformation);

        var asistenciaCrudApp = new AsistenciaCrudApplication($('#page-wrapper'),
                                                              this.historyManager,
                                                              this.apiManager,
                                                              this.databaseInformation);

        var historiaEstadoArqueroCrudApp = new HistoriaEstadoArqueroCrudApplication($('#page-wrapper'),
                                                                                    this.historyManager,
                                                                                    this.apiManager,
                                                                                    this.databaseInformation);

        var torneoCrudApp = new TorneoCrudApplication($('#page-wrapper'),
                                                      this.historyManager,
                                                      this.apiManager,
                                                      this.databaseInformation);

        var entrenamientoRealizadoCrudApp = new EntrenamientoRealizadoCrudApplication($('#page-wrapper'),
                                                                                      this.historyManager,
                                                                                      this.apiManager,
                                                                                      this.databaseInformation);

        this.appsManager.addApplication(1, crudLugarApp);
        this.appsManager.addApplication(3, arcoRecurvadoCrudApp);
        this.appsManager.addApplication(5, invitacionCrudApp);
        this.appsManager.addApplication(4, torneoCrudApp);
        /*
        this.appsManager.addApplication(2, crudUsuariosApp);
        */
        this.appsManager.addApplication(6, crudPagoApp);
        this.appsManager.addApplication(8, arqueroCrudApp);
        this.appsManager.addApplication(9, turnoCrudApp);
        this.appsManager.addApplication(10, asistenciaCrudApp);
        this.appsManager.addApplication(11, historiaEstadoArqueroCrudApp);
        this.appsManager.addApplication(13, entrenamientoRealizadoCrudApp);

        this.registerCrudApplication(GastoCrudApplication, 2, 'gastoCrudApp');

        // ahora registro todo el tema relacionados a los graficos
        this.registerGraficsApplication(PagosAcumuladosGraficoApp, 10001, 'pagosAcumuladosGraficoApp');
        this.registerGraficsApplication(PagosPorMesGraficoApp, 10002, 'pagosPorMesGraficoApp');
        this.registerGraficsApplication(CantidadEstadosPorMesGraficoApp, 10101, 'cantidadEstadosPorMesGraficoApp');
        this.registerGraficsApplication(CantidadAsistenciasGraficoApp, 10102, 'cantidadAsistenciasGraficoApp');
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
    registerCrudApplication: function(crudAppClass, id, attributeName) {
        this[attributeName] = new crudAppClass($("#page-wrapper"),
                                               this.historyManager,
                                               this.apiManager,
                                               this.databaseInformation);
        this.appsManager.addApplication(id, this[attributeName]);
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
