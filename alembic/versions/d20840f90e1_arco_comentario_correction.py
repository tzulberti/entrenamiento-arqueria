"""Arco comentario correction

Revision ID: d20840f90e1
Revises: 4c22d0282a5d
Create Date: 2014-01-10 20:14:50.300389

"""

# revision identifiers, used by Alembic.
revision = 'd20840f90e1'
down_revision = '4c22d0282a5d'

from alembic import op


def upgrade():
    op.alter_column('arco', 'commentario', new_column_name='comentario')


def downgrade():
    op.alter_column('arco', 'comentario', new_column_name='commentario')
