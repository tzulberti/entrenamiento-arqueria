"""lugar

Revision ID: 010
Revises: 009
Create Date: 2014-05-27 22:12:49.465563

"""

# revision identifiers, used by Alembic.
revision = '010'
down_revision = '009'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table('lugar',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('nombre', sa.String(1024), unique=True, nullable=False),
        sa.Column('latitud', sa.Float, nullable=False),
        sa.Column('longitud', sa.Float, nullable=False),
        sa.Column('es_de_entrenamiento', sa.Boolean, nullable=False, default=True),
        sa.Column('es_outdoor', sa.Boolean, nullable=False),
    )

def downgrade():
    op.drop_table('lugar')
