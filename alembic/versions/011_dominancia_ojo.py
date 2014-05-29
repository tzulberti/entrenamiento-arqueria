"""ojo_diestro

Revision ID: 011
Revises: 010
Create Date: 2014-05-27 22:22:56.496004

"""

# revision identifiers, used by Alembic.
revision = '011'
down_revision = '010'

import inspect
import imp
import os
from alembic import op

def upgrade():
    utils_path = os.path.join(os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe()))),
                       '..',
                       'utils.py')

    utils = imp.load_source('', utils_path)
    utils.create_categoric_table('dominancia_ojo', [
        'Izquierdo',
        'Derecho',
    ])



def downgrade():
    op.drop_table('dominancia_ojo')
