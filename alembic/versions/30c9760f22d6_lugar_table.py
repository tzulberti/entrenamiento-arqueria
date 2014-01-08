"""Lugar table

Revision ID: 30c9760f22d6
Revises: None
Create Date: 2014-01-08 06:45:09.455264

"""

# revision identifiers, used by Alembic.
revision = '30c9760f22d6'
down_revision = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table(
        'lugar',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('nombre', sa.String(1024), unique=True, nullable=False),
        sa.Column('latitud', sa.Float, nullable=False),
        sa.Column('longitud', sa.Float, nullable=False),
        sa.Column('es_de_entrenamiento', sa.Boolean, nullable=False, default=True),
    )


def downgrade():
    op.drop_table('lugar')
