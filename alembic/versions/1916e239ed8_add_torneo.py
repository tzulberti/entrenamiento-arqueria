"""Add torneo

Revision ID: 1916e239ed8
Revises: 1330f35e3854
Create Date: 2014-01-28 08:07:38.209795

"""

# revision identifiers, used by Alembic.
revision = '1916e239ed8'
down_revision = '1330f35e3854'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table('torneo',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('cuando', sa.Date, nullable=False),
        sa.Column('id_usuario', sa.Integer, sa.ForeignKey('usuario.id'),
                            nullable=False),
        sa.Column('id_lugar', sa.Integer, sa.ForeignKey('lugar.id')),

        sa.Column('tipo_de_torneo', sa.Text),
        sa.Column('puntaje_final_torneo', sa.Integer),
        sa.Column('fue_practica', sa.Boolean),
    )

def downgrade():
    op.drop_table('torneo')
