"""add arco to torneo

Revision ID: 2153d122bead
Revises: 2a3faeb0776b
Create Date: 2014-02-28 07:24:16.518515

"""

# revision identifiers, used by Alembic.
revision = '2153d122bead'
down_revision = '2a3faeb0776b'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.add_column('torneo',
        sa.Column('id_arco', sa.Integer, sa.ForeignKey('arco.id'))
    )


def downgrade():
    op.drop_column('torneo', 'id_arco')
