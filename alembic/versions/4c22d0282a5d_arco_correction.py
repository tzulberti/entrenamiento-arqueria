"""Arco correction

Revision ID: 4c22d0282a5d
Revises: 256d5b69954d
Create Date: 2014-01-10 19:59:48.278621

"""

# revision identifiers, used by Alembic.
revision = '4c22d0282a5d'
down_revision = '256d5b69954d'

from alembic import op


def upgrade():
    op.alter_column('arco', 'usario_id', new_column_name='id_usuario')


def downgrade():
    op.alter_column('arco', 'id_usuario', new_column_name='usario_id')
