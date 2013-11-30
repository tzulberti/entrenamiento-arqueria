/**
 * Se encarga de registrar todas las diferentes aplicaciones que esta viendo
 * el usuario.
 */

// aca van todas las apps relacionadas al tema del CRUD.
var crudLugarApp = LugarApplication(historyManager, $('.container'));

var appsManager = new AppsManager();
appsManager.addApplication(1, crudLugarApp);

