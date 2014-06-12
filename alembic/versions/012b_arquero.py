"""arquero model

Revision ID: 012b
Revises: 012
Create Date: 2014-06-09 14:17:40.669189

"""

# revision identifiers, used by Alembic.
revision = '012b'
down_revision = '012'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table('arquero',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('email', sa.String(250), nullable=True, unique=True),
        sa.Column('nombre', sa.String(1024), nullable=False),
        sa.Column('apellido', sa.String(1024), nullable=False)
    )



def downgrade():
    op.drop_table('arquero')
