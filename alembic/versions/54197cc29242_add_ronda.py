"""Add ronda

Revision ID: 54197cc29242
Revises: 1916e239ed8
Create Date: 2014-01-28 08:11:13.292796

"""

# revision identifiers, used by Alembic.
revision = '54197cc29242'
down_revision = '1916e239ed8'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table('ronda',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('id_torneo', sa.Integer, sa.ForeignKey('torneo.id'), nullable=False),
        sa.Column('puntaje', sa.Integer),
        sa.Column('distancia', sa.Integer),
        sa.Column('foto', sa.Text),
    )


def downgrade():
    op.drop_table('ronda')
