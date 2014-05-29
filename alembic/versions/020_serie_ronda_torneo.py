"""serie_ronda_torneo

Revision ID: 019
Revises: 018
Create Date: 2014-05-28 06:35:11.059049

"""

# revision identifiers, used by Alembic.
revision = '020'
down_revision = '019'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table('serie',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('fue_de_practica', sa.Boolean),
        sa.Column('puntaje_flecha_1', sa.Integer),
        sa.Column('puntaje_flecha_2', sa.Integer),
        sa.Column('puntaje_flecha_3', sa.Integer),
        sa.Column('puntaje_flecha_4', sa.Integer),
        sa.Column('puntaje_flecha_5', sa.Integer),
        sa.Column('puntaje_flecha_6', sa.Integer),
        sa.Column('puntaje_total', sa.Integer),

        sa.Column('id_ronda', sa.Integer, sa.ForeignKey('ronda.id', ondelete='CASCADE'), nullable=False),
    )



def downgrade():
    op.drop_table('serie')
