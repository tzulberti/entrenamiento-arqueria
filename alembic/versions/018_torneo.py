"""torneo

Revision ID: 017
Revises: 016
Create Date: 2014-05-27 22:48:04.162519

"""

# revision identifiers, used by Alembic.
revision = '018'
down_revision = '017'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table('torneo',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('cuando', sa.Date, nullable=False),

        sa.Column('id_usuario', sa.Integer, sa.ForeignKey('usuario.id', ondelete='CASCADE'), nullable=False),
        sa.Column('id_tipo_de_torneo', sa.Integer, sa.ForeignKey('tipo_torneo.id'), nullable=False),
        sa.Column('id_lugar', sa.Integer, sa.ForeignKey('lugar.id')),
        sa.Column('id_arco', sa.Integer, sa.ForeignKey('arco.id')),

        sa.Column('comentario', sa.Text),
        sa.Column('puntaje_final_torneo', sa.Integer),
        sa.Column('fue_practica', sa.Boolean, nullable=False),
    )


def downgrade():
    op.drop_table('torneo')
