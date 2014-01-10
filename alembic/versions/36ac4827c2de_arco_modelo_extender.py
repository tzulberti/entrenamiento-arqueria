"""Arco modelo extender

Revision ID: 36ac4827c2de
Revises: 42fd2e3938e2
Create Date: 2014-01-10 20:35:46.505975

"""

# revision identifiers, used by Alembic.
revision = '36ac4827c2de'
down_revision = '42fd2e3938e2'

from alembic import op


def upgrade():
    op.alter_column('arco',
                    'modelo_extender_estabailizacion',
                    new_column_name='modelo_extender_estabilizacion')


def downgrade():
    op.alter_column('arco',
                    'modelo_extender_estabilizacion',
                    new_column_name='modelo_extender_estabailizacion')
