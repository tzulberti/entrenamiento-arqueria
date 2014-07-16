"""estado_arquero

Revision ID: 025
Revises: 024
Create Date: 2014-07-16 06:38:42.650813

"""

# revision identifiers, used by Alembic.
revision = '025'
down_revision = '024'

import inspect
import imp
import os
from alembic import op

def upgrade():
    utils_path = os.path.join(os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe()))),
                       '..',
                       'utils.py')

    utils = imp.load_source('', utils_path)
    utils.create_categoric_table('estado_arquero',
                                ['Primer Clase',
                                 'Activo',
                                 'Pasivo',
                                 'Abandono',])


def downgrade():
    op.drop_table('estado_arquero')

