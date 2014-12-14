# -*- coding: utf-8 -*-

from datetime import time
from collections import namedtuple
from flask import session
from wtforms.fields import Field
from wtforms.widgets import TextInput

LoggedUserData = namedtuple('LoggedUserData',
                            ['id', 'email', 'nombre', 'apellido', 'es_administrador', 'permisos'])

def get_logged_user_data():
    if not 'logged_user' in session:
        return None
    return LoggedUserData(*session['logged_user'])


class TimeField(Field):
    widget = TextInput()

    def _value(self):
        if self.data:
            return self._parse_time_value(self.data)
        else:
            return None

    def process_formdata(self, valuelist):
        if valuelist:
            self.data = self._parse_time_value(valuelist[0])
        else:
            self.data = []

    def _parse_time_value(self, data):
        data = data.split(':')
        return time(int(data[0]), int(data[1]))



