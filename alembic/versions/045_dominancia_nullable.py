"""updates

Revision ID: 045
Revises: 044
Create Date: 2015-02-08 07:36:03.329028

"""

# revision identifiers, used by Alembic.
revision = '045'
down_revision = '044'

from alembic import op
import sqlalchemy as db

def upgrade():
    op.alter_column('arquero', 'id_dominancia_ojo', nullable=True)
    op.alter_column('arquero', 'id_dominancia_mano', nullable=True)

def downgrade():
    op.alter_column('arquero', 'id_dominancia_ojo', nullable=False)
    op.alter_column('arquero', 'id_dominancia_mano', nullable=False)

