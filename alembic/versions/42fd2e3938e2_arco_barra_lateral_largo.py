"""Arco barra lateral largo

Revision ID: 42fd2e3938e2
Revises: 2fd647e2a80d
Create Date: 2014-01-10 20:27:41.767127

"""

# revision identifiers, used by Alembic.
revision = '42fd2e3938e2'
down_revision = '2fd647e2a80d'

from alembic import op


def upgrade():
    op.alter_column('arco', 'largo_barrra_lateral_estabilizacion', new_column_name='largo_barra_lateral_estabilizacion')


def downgrade():
    op.alter_column('arco', 'largo_barra_lateral_estabilizacion', new_column_name='largo_barrra_lateral_estabilizacion')
