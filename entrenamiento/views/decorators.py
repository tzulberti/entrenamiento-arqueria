# -*- coding: utf-8 -*-

''' Tiene los decorators que se van a usar en los diferentes views.
'''

from flask import session, abort

def user_required(f):
    def decorator(*args, **kwargs):
        if not 'logged_user' in session:
            abort(401)
        return f(*args, **kwargs)
    return decorator
