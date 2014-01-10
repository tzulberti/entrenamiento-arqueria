"""Arco barra larga

Revision ID: 1330f35e3854
Revises: 36ac4827c2de
Create Date: 2014-01-10 20:38:29.790465

"""

# revision identifiers, used by Alembic.
revision = '1330f35e3854'
down_revision = '36ac4827c2de'

from alembic import op


def upgrade():
    op.alter_column('arco',
                    'modelo_barra_larga_estabailizacion',
                    new_column_name='modelo_barra_larga_estabilizacion')
    op.alter_column('arco',
                    'largo_barrra_larga_estabilizacion',
                    new_column_name='largo_barra_larga_estabilizacion')

def downgrade():
    op.alter_column('arco',
                    'modelo_barra_larga_estabilizacion',
                    new_column_name='modelo_barra_larga_estabailizacion')
    op.alter_column('arco',
                    'largo_barra_larga_estabilizacion',
                    new_column_name='largo_barrra_larga_estabilizacion')

