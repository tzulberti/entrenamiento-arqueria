"""Add invitacion

Revision ID: 2406fdfebae
Revises: 7aaca97526f
Create Date: 2014-03-11 23:21:41.770871

"""

# revision identifiers, used by Alembic.
revision = '2406fdfebae'
down_revision = '7aaca97526f'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table('invitacion',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('email', sa.String(250), nullable=False),
        sa.Column('codigo', sa.String(10), nullable=False),
        sa.Column('usada', sa.Boolean, nullable=False, default=False)
    )


def downgrade():
    op.drop_table('invitacion')
