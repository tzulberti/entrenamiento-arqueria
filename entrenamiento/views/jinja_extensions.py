# -*- coding: utf-8 -*-

'''
Se encarga de definir todas las funciones auxiliares de Jinja
'''

from entrenamiento.views.utils import get_logged_user_data

def has_permission(required_permission):
    ''' Se fija si el usuario tiene los permisos necesarios para poder
    renderar el html correspondiente.

    Esto generalmente va a ir dentro de un IF.

    :param str required_permission: el nombre del permiso que tiene que tener
                                    el usuario para que se renderee esa opcion
    '''
    logged_user = get_logged_user_data()
    if not logged_user:
        return False

    if logged_user.es_administrador:
        return True

    if required_permission in logged_user.permisos:
        return True

    return False

def is_admin():
    ''' Se fija si el usuario en cuestion es administrador.

    Esto se lo usa para poder renderar el HTML correpondiente solo
    cuando es admin del sistema.
    '''
    logged_user = get_logged_user_data()
    if not logged_user:
        return False

    if logged_user.es_administrador:
        return True

    return False

