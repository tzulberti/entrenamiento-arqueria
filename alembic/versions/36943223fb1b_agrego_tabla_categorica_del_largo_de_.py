"""Agrego tabla categorica del largo de arco

Revision ID: 36943223fb1b
Revises: 38d89e77ddf7
Create Date: 2014-04-30 21:08:31.253326

"""

# revision identifiers, used by Alembic.
revision = '36943223fb1b'
down_revision = '38d89e77ddf7'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table(
            'largo_riser',
            sa.Column('id', sa.Integer, primary_key=True),
            sa.Column('value', sa.Text, unique=True),
            sa.Column('show_order', sa.Integer, unique=True)
        )


def downgrade():
    op.drop_table('largo_riser')
