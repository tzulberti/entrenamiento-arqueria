/**
 * Se encarga de registrar todas las diferentes aplicaciones que esta viendo
 * el usuario.
 */

// aca van todas las apps relacionadas al tema del CRUD.
var crudLugarApp = LugarApplication(historyManager, $('.container'));
var crudUsuariosApp = UsuariosCrudApplication(historyManager, $('.container'));
var crudArcosRecurvadosApp = ArcosRecurvadosCrudApplication(historyManager, $('.container'));

var appsManager = new AppsManager();
appsManager.addApplication(1, crudLugarApp);
appsManager.addApplication(2, crudUsuariosApp);
appsManager.addApplication(3, crudArcosRecurvadosApp);

