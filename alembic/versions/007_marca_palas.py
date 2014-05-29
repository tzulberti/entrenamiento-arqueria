"""marca palas

Revision ID: 007
Revises: 006
Create Date: 2014-05-27 22:02:10.769928

"""

# revision identifiers, used by Alembic.
revision = '007'
down_revision = '006'

import inspect
import imp
import os
from alembic import op

def upgrade():
    utils_path = os.path.join(os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe()))),
                       '..',
                       'utils.py')

    utils = imp.load_source('', utils_path)
    utils.create_categoric_table('marca_palas', [
        'Cartel',
        'Fivics',
        'Hoyt',
        'Infitec',
        'Kaya',
        'MK Korea',
        'Mybo',
        'Prana',
        'PSE',
        'Samick',
        'Sebastian Flute',
        'Spigarelli',
        'Uukha',
        'Win & Win',
    ])



def downgrade():
    op.drop_table('marca_palas')
