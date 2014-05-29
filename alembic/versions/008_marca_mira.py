"""marca mira

Revision ID: 008
Revises: 007
Create Date: 2014-05-27 22:04:01.043381

"""

# revision identifiers, used by Alembic.
revision = '008'
down_revision = '007'

import inspect
import imp
import os
from alembic import op

def upgrade():
    utils_path = os.path.join(os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe()))),
                       '..',
                       'utils.py')

    utils = imp.load_source('', utils_path)
    utils.create_categoric_table('marca_mira', [
        'AGF',
        'Angel',
        'Arc Systeme',
        'Avalon',
        'Axcel',
        'Bernardini',
        'Cartel',
        'Fivics',
        'Infitec',
        'Mybo',
        'Sebastian Flute',
        'Shibuya',
        'Spigarelli',
        'Sure-Loc'
    ])



def downgrade():
    op.drop_table('marca_mira')
