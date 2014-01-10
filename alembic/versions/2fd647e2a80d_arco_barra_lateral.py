"""Arco barra lateral

Revision ID: 2fd647e2a80d
Revises: 24f9adc1bf33
Create Date: 2014-01-10 20:25:36.498137

"""

# revision identifiers, used by Alembic.
revision = '2fd647e2a80d'
down_revision = '24f9adc1bf33'

from alembic import op


def upgrade():
    op.alter_column('arco', 'modelo_barra_lateral_estabailizacion', new_column_name='modelo_barra_lateral_estabilizacion')


def downgrade():
    op.alter_column('arco', 'modelo_barra_lateral_estabilizacion', new_column_name='modelo_barra_lateral_estabailizacion')
