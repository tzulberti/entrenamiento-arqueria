"""Marca riser

Revision ID: 006
Revises: 005
Create Date: 2014-05-25 17:41:18.148139

"""

# revision identifiers, used by Alembic.
revision = '006'
down_revision = '005'

import inspect
import imp
import os
from alembic import op

def upgrade():
    utils_path = os.path.join(os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe()))),
                       '..',
                       'utils.py')

    utils = imp.load_source('', utils_path)
    utils.create_categoric_table('marca_riser', [
        'Bernardini',
        'Best',
        'Cartel',
        'Core',
        'FiberBow',
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
    op.drop_table('marca_riser')
