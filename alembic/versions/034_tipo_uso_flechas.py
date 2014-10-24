"""tipo_uso_flechas

Revision ID: 034
Revises: 033
Create Date: 2014-10-18 10:09:04.043197

"""

# revision identifiers, used by Alembic.
revision = '034'
down_revision = '033'

import inspect
import imp
import os
from alembic import op

def upgrade():
    utils_path = os.path.join(os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe()))),
                       '..',
                       'utils.py')

    utils = imp.load_source('', utils_path)
    utils.create_categoric_table('tipo_uso_flechas',
                                [
                                    'Outdoor',
                                    'Indoor',
                                    'Outdoor e Indoor',
                                ])


def downgrade():
    op.drop_table('tipo_uso_flechas')

