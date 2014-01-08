"""Arco tables

Revision ID: 2bb5ce8e2b10
Revises: 1f2bd280dae3
Create Date: 2014-01-08 06:55:06.868888

"""

# revision identifiers, used by Alembic.
revision = '2bb5ce8e2b10'
down_revision = '1f2bd280dae3'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table('arco',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('usario_id', sa.Integer, sa.ForeignKey('usuario.id'), nullable=False),
        sa.Column('tipo_arco', sa.String(255), nullable=False),
        sa.Column('nombre', sa.Text, nullable=False),
        sa.Column('commentario', sa.Text),
        sa.Column('tipo_arco', sa.String(255), nullable=False),

        sa.Column('modelo_barra_larga_estabailizacion', sa.Text),
        sa.Column('largo_barrra_larga_estabilizacion', sa.Integer),
        sa.Column('peso_adicional_barra_larga', sa.Integer),

        sa.Column('modelo_barra_lateral_estabailizacion', sa.Text),
        sa.Column('largo_barrra_lateral_estabilizacion', sa.Integer),
        sa.Column('peso_adicional_barra_lateral', sa.Integer),

        sa.Column('modelo_extender_estabailizacion', sa.Text),
        sa.Column('largo_extender_estabilizacion', sa.Integer),

        sa.Column('modelo_vbar_estabilizacion', sa.Text),
        sa.Column('modelo_rest', sa.Text),
    )



def downgrade():
    op.drop_table('arco')
