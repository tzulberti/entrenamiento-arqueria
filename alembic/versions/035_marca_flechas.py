"""marca_flechas

Revision ID: 035
Revises: 034
Create Date: 2014-10-18 10:12:35.044647

"""

# revision identifiers, used by Alembic.
revision = '035'
down_revision = '034'

import inspect
import imp
import os
from alembic import op

def upgrade():
    utils_path = os.path.join(os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe()))),
                       '..',
                       'utils.py')

    utils = imp.load_source('', utils_path)
    utils.create_categoric_table('marca_flechas',
                                [
                                    'Otra',
                                    'Beman',
                                    'Black Eagle',
                                    'BloodSport',
                                    'Carbon Express',
                                    'Carbon Tech',
                                    'Cartel',
                                    'Easton',
                                    'Gold Tip',
                                    'PSE',
                                    'Victory',
                                ])


def downgrade():
    op.drop_table('tipo_uso_flechas')

