"""tipo_hilo_cuerda

Revision ID: 014
Revises: 013
Create Date: 2014-05-28 07:36:03.329028

"""

# revision identifiers, used by Alembic.
revision = '014'
down_revision = '013'

import inspect
import imp
import os
from alembic import op

def upgrade():
    utils_path = os.path.join(os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe()))),
                       '..',
                       'utils.py')

    utils = imp.load_source('', utils_path)
    utils.create_categoric_table('tipo_hilo_cuerda', [
        'Fast Flight',
        'BYC 55',
        'DynaFlight',
        'BYC 452X',
        'B-50',
        'D-75',
    ])



def downgrade():
    op.drop_table('tipo_hilo_cuerda')


