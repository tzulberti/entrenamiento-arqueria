"""razon gasto

Revision ID: 032
Revises: 031
Create Date: 2014-10-18 07:39:43.893448

"""

# revision identifiers, used by Alembic.
revision = '032'
down_revision = '031'

import inspect
import imp
import os
from alembic import op

def upgrade():
    utils_path = os.path.join(os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe()))),
                       '..',
                       'utils.py')

    utils = imp.load_source('', utils_path)
    utils.create_categoric_table('razon_gasto',
                            ['Sueldo',
                             'Alquiler',
                             'Compra de materiales de arqueria',
                             'Otras cosas'])


def downgrade():
    op.drop_table('razon_gasto')

