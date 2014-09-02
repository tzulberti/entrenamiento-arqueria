# -*- coding: utf-8 -*-

from flask import request, jsonify

from entrenamiento.views.base import BaseEntrenamientoView

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
        line_number = request.form['lineNumber']
        filename = request.form['url']
        error_message = request.form['errorMessage']
        column_number = None
        stacktrace = None


        if 'columnNumber' in request.form:
            column_number = request.form['columnNumber']

        if 'stacktrace' in request.form:
            stacktrace = request.form['stacktrace']

        mail_content = 'Archivo: {filename}\nLine Number: {line_number}\nMessage: {error_message}\n'

        if column_number:
            mail_content += 'Column Number: {column_number}\n'

        if stacktrace:
            mail_content += 'Stacktrace: {stacktrace}\n'

        mail_content = mail_content.format(line_number=line_number,
                                           filename=filename,
                                           error_message=error_message,
                                           column_number=column_number,
                                           stacktrace=stacktrace)
        self.mail_sender.send_mail(self.developers,
                                   '[Sistema-EDA] Javascript Error',
                                   mail_content)
        return jsonify(ok=True)




