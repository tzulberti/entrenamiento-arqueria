"""Arco Recurvado buttom

Revision ID: 24f9adc1bf33
Revises: d20840f90e1
Create Date: 2014-01-10 20:21:25.783922

"""

# revision identifiers, used by Alembic.
revision = '24f9adc1bf33'
down_revision = 'd20840f90e1'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.add_column('arco_recurvado',
        sa.Column('modelo_buttom', sa.String(1024))
    )


def downgrade():
    op.drop_column('arco_recurvado', 'modelo_buttom')
