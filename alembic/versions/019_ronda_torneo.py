"""ronda_torneo

Revision ID: 018
Revises: 017
Create Date: 2014-05-27 23:01:46.188072

"""

# revision identifiers, used by Alembic.
revision = '019'
down_revision = '018'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table('ronda',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('id_torneo', sa.Integer, sa.ForeignKey('torneo.id', ondelete='CASCADE'), nullable=False),
        sa.Column('puntaje', sa.Integer),
        sa.Column('distancia', sa.Integer),
        sa.Column('foto_path', sa.Text),
    )


def downgrade():
    op.drop_table('ronda')
