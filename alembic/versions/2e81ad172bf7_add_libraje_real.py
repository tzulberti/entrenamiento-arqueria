"""Add libraje real

Revision ID: 2e81ad172bf7
Revises: e662618b6c0
Create Date: 2014-03-22 11:26:13.535916

"""

# revision identifiers, used by Alembic.
revision = '2e81ad172bf7'
down_revision = 'e662618b6c0'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.add_column('arco_recurvado',
                  sa.Column('libraje_real', sa.Integer))


def downgrade():
    op.drop_column('arco_recurvado', 'libraje_real')

