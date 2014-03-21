"""marca riser y palas

Revision ID: e662618b6c0
Revises: 2e7d8c654a5d
Create Date: 2014-03-21 08:16:12.953921

"""

# revision identifiers, used by Alembic.
revision = 'e662618b6c0'
down_revision = '2e7d8c654a5d'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.add_column('arco_recurvado',
                  sa.Column('marca_riser', sa.String(200)))
    op.add_column('arco_recurvado',
                  sa.Column('marca_palas', sa.String(200)))


def downgrade():
    op.drop_column('arco_recurvado', 'marca_riser')
    op.drop_column('arco_recurvado', 'marca_palas')
