"""tipo entrenamiento

Revision ID: 042
Revises: 041
Create Date: 2015-01-20 06:56:55.218594

"""

# revision identifiers, used by Alembic.
revision = '042'
down_revision = '041'

import inspect
import imp
import os
from alembic import op

def upgrade():
    utils_path = os.path.join(os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe()))),
                       '..',
                       'utils.py')

    utils = imp.load_source('', utils_path)
    op.drop_table('tipo_entrenamiento')
    utils.create_categoric_table('tipo_entrenamiento',
                                [
                                    'Casa',
                                    '2m',
                                    '12m',
                                    '18m',
                                    '20m',
                                    '30m',
                                    '50m',
                                    '60m',
                                    '70m',
                                    '90m',
                                ])


def downgrade():
    op.drop_table('tipo_entrenamiento')



