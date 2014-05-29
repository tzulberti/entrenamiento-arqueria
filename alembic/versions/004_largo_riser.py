"""Largo riser

Revision ID: 004
Revises: 003
Create Date: 2014-05-25 17:32:03.342809

"""

# revision identifiers, used by Alembic.
revision = '004'
down_revision = '003'

import inspect
import imp
import os
from alembic import op

def upgrade():
    utils_path = os.path.join(os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe()))),
                       '..',
                       'utils.py')

    utils = imp.load_source('', utils_path)
    utils.create_categoric_table('largo_riser',
                        ['23" (Short)',
                         '25" (Medium)',
                         '27" (Long)'])


def downgrade():
    op.drop_table('largo_riser')

