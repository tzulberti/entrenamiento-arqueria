# -*- coding: utf-8 -*-

"""tipo_entrenamiento

Revision ID: 029
Revises: 028
Create Date: 2014-08-05 22:48:29.805732

"""

# revision identifiers, used by Alembic.
revision = '029'
down_revision = '028'

import inspect
import imp
import os
from alembic import op

def upgrade():
    utils_path = os.path.join(os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe()))),
                       '..',
                       'utils.py')

    utils = imp.load_source('', utils_path)
    utils.create_categoric_table('tipo_entrenamiento',
                            [u'Acumulación',
                             u'Transmisión',
                             u'Realización',
                             ])


def downgrade():
    op.drop_table('tipo_entrenamiento')

