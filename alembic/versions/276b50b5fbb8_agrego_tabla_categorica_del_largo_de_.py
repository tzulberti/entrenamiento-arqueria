"""Agrego tabla categorica del largo de palas

Revision ID: 276b50b5fbb8
Revises: 36943223fb1b
Create Date: 2014-04-30 21:08:35.924197

"""

# revision identifiers, used by Alembic.
revision = '276b50b5fbb8'
down_revision = '36943223fb1b'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table(
            'largo_palas',
            sa.Column('id', sa.Integer, primary_key=True),
            sa.Column('value', sa.Text, unique=True),
            sa.Column('show_order', sa.Integer, unique=True)
        )



def downgrade():
    op.drop_table('largo_palas')
