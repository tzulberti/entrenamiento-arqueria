"""Create Razones pago

Revision ID: 002
Revises: 001
Create Date: 2014-05-25 16:58:25.885654

"""

# revision identifiers, used by Alembic.
revision = '002'
down_revision = '001'

import inspect
import imp
import os
from alembic import op

def upgrade():
    utils_path = os.path.join(os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe()))),
                       '..',
                       'utils.py')

    utils = imp.load_source('', utils_path)
    utils.create_categoric_table('razon_pago',
                    ['Socio Activo', 'Socio Pasivo',
                     'Cuota FITA', 'Inscripcion a torneo FITA'])


def downgrade():
    op.drop_table('razon_pago')
