# -*- coding: utf-8 -*-

from flask import request, jsonify

from entrenamiento.views.base import BaseEntrenamientoView
from entrenamiento.views.utils import get_logged_user_data

class JavascriptErrorView(BaseEntrenamientoView):
    ''' Se encarga de mandarle un mail a los developers indicando
    toda la informacion del error de javascript de la que se tiene
    informacion.

    :param mail_sender: la instancia que se va a encargar de mandar el mail
                        con toda la informacion del javascript que se
                        tenga.

    :param list(str) developers: los emails de los developers a quienes les
                                 tiene que llegar un mail en caso de que haya
                                 un error de javascript


    :param boolean development: si es True, se esta en development y por lo
                                tanto no se tiene que mandar el mail con toda
                                la informacion del error.
    '''

    def __init__(self, mail_sender, developers, development):
        self.mail_sender = mail_sender
        self.developers = developers
        self.development = development

    def post(self):
        if self.development:
            return jsonify(ok=True)

        logged_user = get_logged_user_data()
        format_data = dict(
            line_number=request.form['lineNumber'],
            filename=request.form['url'],
            error_message=request.form['errorMessage'],
            user_url=request.form['userURL'],
        )


        mail_content = 'Archivo: {filename}\nLine Number: {line_number}\nMessage: {error_message}\nURL: {user_url}\n'

        if 'columnNumber' in request.form:
            mail_content += 'Column Number: {column_number}\n'
            format_data['column_number'] = request.form['columnNumber']

        if 'stacktrace' in request.form:
            mail_content += 'Stacktrace: {stacktrace}\n'
            format_data['stacktrace'] = request.form['stacktrace']

        if logged_user:
            mail_content += 'Username: {username}\n'
            format_data['username'] = logged_user.email

        mail_content = mail_content.format(**format_data)
        self.mail_sender.send_mail(self.developers,
                                   '[Sistema-EDA] Javascript Error',
                                   mail_content)
        return jsonify(ok=True)




