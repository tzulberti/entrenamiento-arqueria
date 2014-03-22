"""Add tipo encastre palas

Revision ID: 38d89e77ddf7
Revises: 2e81ad172bf7
Create Date: 2014-03-22 11:33:11.554040

"""

# revision identifiers, used by Alembic.
revision = '38d89e77ddf7'
down_revision = '2e81ad172bf7'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.add_column('arco_recurvado',
                  sa.Column('tipo_encastre', sa.String(100)))


def downgrade():
    op.drop_column('arco_recurvado', 'tipo_encastre')
