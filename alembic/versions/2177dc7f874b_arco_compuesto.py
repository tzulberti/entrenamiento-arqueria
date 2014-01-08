"""Arco compuesto

Revision ID: 2177dc7f874b
Revises: b25bcd17c01
Create Date: 2014-01-08 07:22:11.315837

"""

# revision identifiers, used by Alembic.
revision = '2177dc7f874b'
down_revision = 'b25bcd17c01'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table(
        'arco_compuesto',
        sa.Column('id', sa.Integer, sa.ForeignKey('arco.id'), primary_key=True),
    )


def downgrade():
    op.drop_table('arco_compuesto')
