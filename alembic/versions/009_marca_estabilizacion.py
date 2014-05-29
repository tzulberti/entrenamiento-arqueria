"""marca estabilizacion

Revision ID: 009
Revises: 008
Create Date: 2014-05-27 22:07:31.127493

"""

# revision identifiers, used by Alembic.
revision = '009'
down_revision = '008'

import inspect
import imp
import os
from alembic import op

def upgrade():
    utils_path = os.path.join(os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe()))),
                       '..',
                       'utils.py')

    utils = imp.load_source('', utils_path)
    utils.create_categoric_table('marca_estabilizacion', [
        'AAE',
        'Bee Stinger',
        'Beiter',
        'Cartel',
        'Dead Center',
        'Doinker',
        'DP Sleeves',
        'Easton',
        'EXE',
        'Extreme',
        'Fivics',
        'FUSE',
        'Kaya',
        'Mybo',
        'Robinhood Video Productions',
        'Samick',
        'Sebastian Flute',
        'Shibuya',
        'Shrewd',
        'Speciality',
        'Stokerized',
        'Win & Win',
    ])



def downgrade():
    op.drop_table('marca_estabilizacion')
