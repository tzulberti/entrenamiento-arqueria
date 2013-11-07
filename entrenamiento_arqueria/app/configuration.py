# -*- coding: utf-8 -*-


''' Tiene las diferentes configuraciones teniendo en cuenta el entorno donde
esto esta corriendo.
'''

class Configuration(object):
    ''' La configuracion base de la cual todo el resto de las configuraciones
    tienen que extender.
    '''

    #: la clave que se usa para firmar las cookies que se manden
    SECRET_KEY = '\xb7\xdb\xc3\x8c`\x05\xed@\xcfy\xdfN\x1fi\x92\xfe\x15\xb1\xf2vD\x1e\x1e\xe9'

    #: tiene el path seguns SQLAlchemy que se va a usar para conectarse
    #: a la base de datos.
    DATABASE_PATH = None

class Development(Configuration):
    ''' Tiene la configuracion de cuando se esta trabajando en desarollo.
    '''

    #: hace que se conecte a una base de datos sqlite3 en donde se va a
    #: guardar toda la informacion
    DATABASE_PATH = 'sqlite:////media/data/Proyectos/entrenamiento-arqueria/database/entrenamiento.db'



def get_configuration(hostname):
    ''' Devuelve la configuracion que se tiene que usar teniendo
    en cuenta el hostname en donde esta corriendo esto.

    :param str hostname: el nombre de la maquina/servidor en donde
                         esta corriendo el sistema.

    :return: la configuracion especifica de ese hostname si es
             que existe, sino devuelve la de :class:`.Development`
    '''
    return Development
