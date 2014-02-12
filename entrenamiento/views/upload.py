# -*- coding: utf-8 -*-

import os
from flask import request, abort, jsonify
from werkzeug.utils import secure_filename

from entrenamiento.views.base import BaseEntrenamientoView


class UploadFileView(BaseEntrenamientoView):
    ''' View usada para guardar la informacion de lo que sube el usuario.

    :param list(str) file_extensions: las extensiones validas de los archivos que
                                      puede llegar a subir el usuario.

    :param str upload_folder: la carpeta en donde se puede llegar a subir el
                              archivo en cuestion.
    '''

    def __init__(self, file_extensions, upload_folder):
        super(UploadFileView, self).__init__()
        self.file_extensions = file_extensions
        self.upload_folder = upload_folder

    def post(self):
        file = request.files['file']
        if file and '.' in file.filename:
            extension = file.filename.rsplit('.', 1)[1]
            extension = extension.lower()
            if not extension in self.file_extensions:
                return jsonify(message='Invalid file extension',status='error')

            filename = secure_filename(file.filename)
            file.save(os.path.join(self.upload_folder, filename))
            return jsonify(filename=filename, status='ok')
        else:
            abort(401)


