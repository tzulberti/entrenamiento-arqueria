"""Add tipo pago categoric column

Revision ID: e7a43b20e2b
Revises: 4b2037cdc754
Create Date: 2014-05-07 06:35:17.448473

"""

# revision identifiers, used by Alembic.
revision = 'e7a43b20e2b'
down_revision = '4b2037cdc754'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table('razon_pago',
            sa.Column('id', sa.Integer, primary_key=True),
            sa.Column('value', sa.Text, unique=True),
            sa.Column('show_order', sa.Integer, unique=True)
    )


def downgrade():
    op.drop_table('razon_pago')
