"""Add dominancia user

Revision ID: 11f80e38b0ed
Revises: 8c93d57e692
Create Date: 2014-03-21 07:54:45.964386

"""

# revision identifiers, used by Alembic.
revision = '11f80e38b0ed'
down_revision = '8c93d57e692'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.add_column('usuario',
                  sa.Column('dominancia_ojo', sa.String(20))
    )
    op.add_column('usuario',
                  sa.Column('dominancia_mano', sa.String(20))
    )


def downgrade():
    op.drop_column('usuario', 'dominancia_ojo')
    op.drop_column('usuario', 'dominancia_mano')
