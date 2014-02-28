"""Add coment to torneo

Revision ID: 2a3faeb0776b
Revises: b4157b9e5e
Create Date: 2014-02-28 07:13:16.445322

"""

# revision identifiers, used by Alembic.
revision = '2a3faeb0776b'
down_revision = 'b4157b9e5e'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.add_column('torneo',
            sa.Column('comentario', sa.Text())
    )


def downgrade():
    op.drop_column('torneo', 'comentario')

