"""pago

Revision ID: 020
Revises: 019
Create Date: 2014-05-28 07:16:44.057774

"""

# revision identifiers, used by Alembic.
revision = '021'
down_revision = '020'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table('pago',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('id_razon_pago', sa.Integer, sa.ForeignKey('razon_pago.id'), nullable=False),
        sa.Column('id_arquero', sa.Integer, sa.ForeignKey('arquero.id'), nullable=False),
        sa.Column('id_cargado_por', sa.Integer, sa.ForeignKey('usuario.id'), nullable=False),
        sa.Column('cuando', sa.Date, nullable=False),
        sa.Column('mes_correspondiente', sa.Date, nullable=False),
        sa.Column('importe', sa.Float, nullable=False),
        sa.Column('comprobante_path', sa.Text),
        sa.Column('comentario', sa.Text)
    )


def downgrade():
    op.drop_table('pago')
