"""Users table

Revision ID: 1f2bd280dae3
Revises: 30c9760f22d6
Create Date: 2014-01-08 06:50:31.513265

"""

# revision identifiers, used by Alembic.
revision = '1f2bd280dae3'
down_revision = '30c9760f22d6'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table(
        'usuario',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('email', sa.String(1024), nullable=False, unique=True),
        sa.Column('password', sa.String(1024), nullable=False),
        sa.Column('nombre', sa.String(1024), nullable=False),
        sa.Column('apellido', sa.String(1024), nullable=False),
        sa.Column('es_entrenador', sa.Boolean, nullable=False, default=False),
        sa.Column('es_administrador', sa.Boolean, nullable=False, default=False),
    )

def downgrade():
    op.drop_table('usuario')
