"""Use razon_pago table

Revision ID: 180a31675313
Revises: e7a43b20e2b
Create Date: 2014-05-07 06:39:03.127953

"""

# revision identifiers, used by Alembic.
revision = '180a31675313'
down_revision = 'e7a43b20e2b'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.drop_column('pago', 'razon')
    op.add_column('pago',
                sa.Column('razon_pago_id', sa.Integer, sa.ForeignKey('razon_pago.id')))


def downgrade():
    op.drop_column('pago', 'razon_pago_id')
    op.add_column('pago',
            sa.Column('razon', sa.Text, nullable=False))
