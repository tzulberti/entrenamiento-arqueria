"""dominancia mano

Revision ID: 012
Revises: 011
Create Date: 2014-05-27 22:26:08.051271

"""

# revision identifiers, used by Alembic.
revision = '012'
down_revision = '011'

import inspect
import imp
import os
from alembic import op

def upgrade():
    utils_path = os.path.join(os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe()))),
                       '..',
                       'utils.py')

    utils = imp.load_source('', utils_path)
    utils.create_categoric_table('dominancia_mano', [
        'Izquierdo',
        'Derecho',
        'Ambidiestro',
    ])



def downgrade():
    op.drop_table('dominancia_mano')
