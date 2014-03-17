"""Create pago

Revision ID: 8c93d57e692
Revises: 514ba03e3483
Create Date: 2014-03-16 20:53:30.030717

"""

# revision identifiers, used by Alembic.
revision = '8c93d57e692'
down_revision = '514ba03e3483'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table(
            'pago',
            sa.Column('id', sa.Integer, primary_key=True),
            sa.Column('cuando', sa.Date, nullable=False),
            sa.Column('mes_correspondiente', sa.Date, nullable=False),
            sa.Column('importe', sa.Float, nullable=False),
            sa.Column('razon', sa.String(1024), nullable=False),
            sa.Column('id_usuario', sa.Integer, sa.ForeignKey('usuario.id'), nullable=False),
            sa.Column('cargado_por', sa.Integer, sa.ForeignKey('usuario.id'), nullable=False)
    )


def downgrade():
    op.drop_table('pago')
