"""arco recurvado

Revision ID: 015
Revises: 015
Create Date: 2014-05-27 22:36:06.936698

"""

# revision identifiers, used by Alembic.
revision = '016'
down_revision = '015'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table('arco_recurvado',
        sa.Column('id', sa.Integer, sa.ForeignKey('arco.id'), primary_key=True),
        sa.Column('id_marca_riser', sa.Integer, sa.ForeignKey('marca_riser.id')),
        sa.Column('modelo_riser', sa.String(1024)),
        sa.Column('id_largo_riser', sa.Integer, sa.ForeignKey('largo_riser.id')),
        sa.Column('id_tipo_encastre', sa.Integer, sa.ForeignKey('tipo_encastre.id')),
        sa.Column('usa_barras_cortas', sa.Boolean, nullable=False, default=False),
        sa.Column('id_marca_palas', sa.Integer, sa.ForeignKey('marca_palas.id')),
        sa.Column('modelo_palas', sa.String(1024)),
        sa.Column('libraje_palas', sa.Integer),
        sa.Column('libraje_real', sa.Integer),
        sa.Column('id_largo_palas', sa.Integer, sa.ForeignKey('largo_palas.id')),
        sa.Column('usa_honguitos', sa.Boolean, nullable=False, default=False),
        sa.Column('tiller', sa.Float),
        sa.Column('brace', sa.Float),
        sa.Column('altura_nocking_point', sa.Float),
        sa.Column('modelo_clicker', sa.String(1024)),
        sa.Column('id_marca_mira', sa.Integer, sa.ForeignKey('marca_mira.id')),
        sa.Column('modelo_mira', sa.String(1024)),
        sa.Column('usa_peewees', sa.Boolean, nullable=False, default=False),
        sa.Column('modelo_cushion_plunger', sa.String(1024)),
        sa.Column('id_tipo_hilo_cuerda', sa.Integer, sa.ForeignKey('tipo_hilo_cuerda.id')),
        sa.Column('cantidad_hilos_cuerda', sa.Integer),
        sa.Column('largo_cuerda', sa.Integer),
        sa.Column('cantidad_vueltas_cuerda', sa.Integer),
    )


def downgrade():
    op.drop_table('arco_recurvado')
