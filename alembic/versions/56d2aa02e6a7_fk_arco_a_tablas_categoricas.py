"""FK arco a tablas categoricas

Revision ID: 56d2aa02e6a7
Revises: 276b50b5fbb8
Create Date: 2014-04-30 21:12:25.897777

"""

# revision identifiers, used by Alembic.
revision = '56d2aa02e6a7'
down_revision = '276b50b5fbb8'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.drop_column('arco_recurvado', 'largo_riser')
    op.drop_column('arco_recurvado', 'largo_palas')

    op.add_column('arco_recurvado',
                  sa.Column('largo_riser', sa.Integer, sa.ForeignKey('largo_riser.id')))
    op.add_column('arco_recurvado',
                  sa.Column('largo_palas', sa.Integer, sa.ForeignKey('largo_palas.id')))


def downgrade():
    op.drop_column('arco_recurvado', 'largo_riser')
    op.drop_column('arco_recurvado', 'largo_palas')

    op.add_column('arco_recurvado',
                  sa.Column('largo_riser', sa.Text))
    op.add_column('arco_recurvado',
                  sa.Column('largo_palas', sa.Text))

