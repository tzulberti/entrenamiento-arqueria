"""arco

Revision ID: 014
Revises: 013
Create Date: 2014-05-27 22:32:33.767037

"""

# revision identifiers, used by Alembic.
revision = '015'
down_revision = '014'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table('arco',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('id_usuario', sa.Integer, sa.ForeignKey('usuario.id')),
        sa.Column('nombre', sa.String(1024), nullable=False),
        sa.Column('comentario', sa.Text),
        sa.Column('tipo_arco', sa.String(255), nullable=False),

        sa.Column('draw', sa.Float),

        sa.Column('id_marca_barra_larga_estabilizacion', sa.Integer, sa.ForeignKey('marca_estabilizacion.id')),
        sa.Column('modelo_barra_larga_estabilizacion', sa.String(1024)),
        sa.Column('largo_barra_larga_estabilizacion', sa.Integer),
        sa.Column('peso_adicional_barra_larga', sa.Integer),

        sa.Column('id_marca_barra_lateral_estabilizacion', sa.Integer, sa.ForeignKey('marca_estabilizacion.id')),
        sa.Column('modelo_barra_lateral_estabilizacion', sa.String(1024)),
        sa.Column('largo_barra_lateral_estabilizacion', sa.Integer),
        sa.Column('peso_adicional_barra_lateral', sa.Integer),

        sa.Column('id_marca_extender_estabilizacion', sa.Integer, sa.ForeignKey('marca_estabilizacion.id')),
        sa.Column('modelo_extender_estabilizacion', sa.String(1024)),
        sa.Column('largo_extender_estabilizacion', sa.Integer),

        sa.Column('modelo_vbar_estabilizacion', sa.String(1024)),
        sa.Column('vbar_angulo_apertura', sa.Integer),
        sa.Column('vbar_angulo_inclinacion', sa.Integer),
        sa.Column('modelo_rest', sa.String(1024))
    )


def downgrade():
    op.drop_table('arco')
