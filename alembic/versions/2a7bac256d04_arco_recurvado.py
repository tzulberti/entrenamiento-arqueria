"""Arco recurvado

Revision ID: 2a7bac256d04
Revises: 2bb5ce8e2b10
Create Date: 2014-01-08 07:08:28.765072

"""

# revision identifiers, used by Alembic.
revision = '2a7bac256d04'
down_revision = '2bb5ce8e2b10'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table(
        'arco_recurvado',
        sa.Column('id', sa.Integer, sa.ForeignKey('arco.id'), primary_key=True),
        sa.Column('modelo_raiser', sa.Text),
        sa.Column('largo_raiser', sa.Text),
        sa.Column('modelo_palas', sa.Text),
        sa.Column('libraje_palas', sa.Integer),
        sa.Column('largo_palas', sa.Text),
        sa.Column('modelo_clicker', sa.Text),
        sa.Column('modelo_mira', sa.Text),
    )


def downgrade():
    op.drop_table('arco_recurvado')
