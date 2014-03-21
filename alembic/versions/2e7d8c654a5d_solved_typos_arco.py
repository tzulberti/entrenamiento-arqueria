"""Solved typos arco

Revision ID: 2e7d8c654a5d
Revises: 11f80e38b0ed
Create Date: 2014-03-21 08:08:10.035757

"""

# revision identifiers, used by Alembic.
revision = '2e7d8c654a5d'
down_revision = '11f80e38b0ed'

from alembic import op


def upgrade():
    op.alter_column('arco_recurvado',
                    'modelo_raiser',
                    new_column_name='modelo_riser')
    op.alter_column('arco_recurvado',
                    'largo_raiser',
                    new_column_name='largo_riser')
    op.alter_column('arco_recurvado',
                    'modelo_buttom',
                    new_column_name='modelo_cushion_plunger')



def downgrade():
    op.alter_column('arco_recurvado',
                     'modelo_riser',
                     new_column_name='modelo_raiser')
    op.alter_column('arco_recurvado',
                    'largo_riser',
                    new_column_name='largo_raiser')
    op.alter_column('arco_recurvado',
                    'modelo_cushion_plunger',
                    new_column_name='modelo_buttom')

