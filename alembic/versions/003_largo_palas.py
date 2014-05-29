"""Largo palas

Revision ID: 003
Revises: 002
Create Date: 2014-05-25 17:29:37.923644

"""

# revision identifiers, used by Alembic.
revision = '003'
down_revision = '002'

import inspect
import imp
import os
from alembic import op

def upgrade():
    utils_path = os.path.join(os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe()))),
                       '..',
                       'utils.py')

    utils = imp.load_source('', utils_path)
    utils.create_categoric_table('largo_palas',
                            ['66" (Short)',
                             '68" (Medium)',
                             '70" (Long)'])


def downgrade():
    op.drop_table('largo_palas')

