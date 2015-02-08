# -*- coding: utf-8 -*-

import os
from flask import request, abort, jsonify, send_from_directory
from PIL import Image
from werkzeug.utils import secure_filename

from entrenamiento.views.base import BaseEntrenamientoView
from entrenamiento.utils import random_text


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

    def get(self, path, filename):
        ''' Se encarga de devolver la imagen correspondiente que fue subida
        por el usuario.

        :param str path: la carpeta en donde el usuario subio el archivo.

        :param str filename: el nombre del archivo que se quiere servir.
        '''
        return send_from_directory(os.path.join(self.upload_folder, path),
                                   filename)

    def post(self, path):
        ''' Se encarga de guardar el archivo que subio el usuario.

        Al nombre del archivo lo va a guardar con un nombre random, y no con
        el nombre que el usuario le haya puesto. Esto es para evitar problemas
        despues con el tema de espacios en los archivos y otros cosas.

        :param str path: indica en que subcarpeta se tiene que guardar el archivo.
                         Basicamente es el nombre del modelo.
        '''
        file = request.files['file']
        if file and '.' in file.filename:
            extension = file.filename.rsplit('.', 1)[1]
            extension = extension.lower()
            if not extension in self.file_extensions:
                return jsonify(message='Invalid file extension',status='error')

            # me fijo si existe la carpeta en donde se tiene que guardar la imagen
            if not os.path.exists(os.path.join(self.upload_folder, path)):
                os.makedirs(os.path.join(self.upload_folder, path))

            complete_path = None
            filename = None
            while True:
                filename = secure_filename(random_text(20) + '.' + extension)
                complete_path = os.path.join(self.upload_folder, path, filename)
                if not os.path.exists(complete_path):
                    break

            file.save(complete_path)
            # ahora me encargo de crear un thumb de la imagen si lo que el usuario
            # subio es una imagen y no un PDF
            if not extension in ('pdf'):
                img = Image.open(complete_path)
                img.thumbnail((120, 120), Image.ANTIALIAS)
                img.save(os.path.join(self.upload_folder, path, "thumb_%s" % filename))

            return jsonify(filename=os.path.join(path, filename),
                           thumb_filename=os.path.join(path, 'thumb_%s' % filename),
                           status='ok')
        else:
            abort(401)


