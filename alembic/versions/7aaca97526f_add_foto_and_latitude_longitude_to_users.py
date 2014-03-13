"""Add foto and latitude/longitude to users

Revision ID: 7aaca97526f
Revises: 2153d122bead
Create Date: 2014-03-11 23:07:16.570720

"""

# revision identifiers, used by Alembic.
revision = '7aaca97526f'
down_revision = '2153d122bead'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.add_column('usuario',
            sa.Column('foto', sa.String(1024))
    )
    op.add_column('usuario',
            sa.Column('latitud', sa.Float)
    )
    op.add_column('usuario',
            sa.Column('longitud', sa.Float)
    )


def downgrade():
    op.drop_column('usuario', 'foto')
    op.drop_column('usuario', 'latitud')
    op.drop_column('usuario', 'longitud')
