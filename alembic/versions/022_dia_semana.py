"""Dia semana

Revision ID: 4022
Revises: 021
Create Date: 2014-06-23 07:38:57.942347

"""

# revision identifiers, used by Alembic.
revision = '022'
down_revision = '021'

import inspect
import imp
import os
from alembic import op

def upgrade():
    utils_path = os.path.join(os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe()))),
                       '..',
                       'utils.py')

    utils = imp.load_source('', utils_path)
    utils.create_categoric_table('dia_semana',
                            ['Domingo',
                             'Lunes',
                             'Martes',
                             'Miercoles',
                             'Jueves',
                             'Viernes',
                             'Sabado'])


def downgrade():
    op.drop_table('dia_semana')

