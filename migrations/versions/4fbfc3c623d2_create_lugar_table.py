"""Create lugar table

Revision ID: 4fbfc3c623d2
Revises: None
Create Date: 2013-11-07 08:48:18.177784

"""

# revision identifiers, used by Alembic.
revision = '4fbfc3c623d2'
down_revision = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table(
        'lugar',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('nombre', sa.String(1024), nullable=False, unique=True),
        sa.Column('latitud', sa.Float, nullable=False),
        sa.Column('longitud', sa.Float, nullable=False),
        sa.Column('es_de_entrenamiento', sa.Boolean, nullable=False, default=True),
    )
    pass


def downgrade():
    op.drop_table('lugar')

