"""Tipo Encastre riser

Revision ID: 005
Revises: 004
Create Date: 2014-05-25 17:33:56.402500

"""

# revision identifiers, used by Alembic.
revision = '005'
down_revision = '004'

import inspect
import imp
import os
from alembic import op

def upgrade():
    utils_path = os.path.join(os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe()))),
                       '..',
                       'utils.py')

    utils = imp.load_source('', utils_path)
    utils.create_categoric_table('tipo_encastre',
                                ['Prana', 'IFL', 'Formula'])


def downgrade():
    op.drop_table('tipo_encastre')
