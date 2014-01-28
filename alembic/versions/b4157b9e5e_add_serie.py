"""Add serie

Revision ID: b4157b9e5e
Revises: 54197cc29242
Create Date: 2014-01-28 08:13:00.914050

"""

# revision identifiers, used by Alembic.
revision = 'b4157b9e5e'
down_revision = '54197cc29242'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table('serie',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('id_ronda', sa.Integer, sa.ForeignKey('ronda.id'), nullable=False),
        sa.Column('fue_de_practica', sa.Boolean),
        sa.Column('puntaje_flecha_1', sa.Integer),
        sa.Column('puntaje_flecha_2', sa.Integer),
        sa.Column('puntaje_flecha_3', sa.Integer),
        sa.Column('puntaje_flecha_4', sa.Integer),
        sa.Column('puntaje_flecha_5', sa.Integer),
        sa.Column('puntaje_flecha_6', sa.Integer),
        sa.Column('puntaje_total', sa.Integer),
    )


def downgrade():
    op.drop_table('serie')
