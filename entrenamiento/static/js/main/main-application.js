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

        var crudLugarApp = new LugarCrudApplication($('.crud-container'),
                                                    this.historyManager,
                                                    this.apiManager,
                                                    this.databaseInformation);

        var crudPagoApp = new PagoCrudApplication($('.crud-container'),
                                                  this.historyManager,
                                                  this.apiManager,
                                                  this.databaseInformation);
        var invitacionCrudApp = new InvitacionCrudApplication($('.crud-container'),
                                                              this.historyManager,
                                                              this.apiManager,
                                                              this.databaseInformation);
        var arcoRecurvadoCrudApp = new ArcoRecurvadoCrudApplication($('.crud-container'),
                                                                    this.historyManager,
                                                                    this.apiManager,
                                                                    this.databaseInformation);

        this.appsManager.addApplication(1, crudLugarApp);
        this.appsManager.addApplication(3, arcoRecurvadoCrudApp);
        this.appsManager.addApplication(5, invitacionCrudApp);
        /*
        this.appsManager.addApplication(2, crudUsuariosApp);
        this.appsManager.addApplication(4, crudTorneosApp);
        */
        this.appsManager.addApplication(6, crudPagoApp);

        this.menuView = new MainMenuView($("#side-menu"),
                                         this.appsManager);
        this.menuView.render();

        $('#side-menu').metisMenu();

    }
});
