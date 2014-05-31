# -*- coding: utf-8 -*-

from collections import namedtuple
from flask import session

LoggedUserData = namedtuple('LoggedUserData',
                            ['id', 'email', 'nombre', 'apellido', 'es_administrador'])

def get_logged_user_data():
    if not 'logged_user' in session:
        return None
    return LoggedUserData(*session['logged_user'])

