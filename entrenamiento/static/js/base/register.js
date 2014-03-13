/**
 * Se encarga de registrar todas las diferentes aplicaciones que esta viendo
 * el usuario.
 */

// aca van todas las apps relacionadas al tema del CRUD.
var crudLugarApp = new LugarApplication(historyManager, $('.container'));
var crudUsuariosApp = new UsuariosCrudApplication(historyManager, $('.container'));
var crudArcosRecurvadosApp = new ArcosRecurvadosCrudApplication(historyManager, $('.container'));
var crudTorneosApp = new TorneosCrudApplication(historyManager, $('.container'));
var crudInvitacionApp = new InvitacionCrudApplication(historyManager, $('.container'));

var appsManager = new AppsManager();
appsManager.addApplication(1, crudLugarApp);
appsManager.addApplication(2, crudUsuariosApp);
appsManager.addApplication(3, crudArcosRecurvadosApp);
appsManager.addApplication(4, crudTorneosApp);
appsManager.addApplication(5, crudInvitacionApp);

