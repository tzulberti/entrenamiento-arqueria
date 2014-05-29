"""Create invitacion model

Revision ID: 001
Revises: None
Create Date: 2014-05-25 16:30:24.725129

"""

# revision identifiers, used by Alembic.
revision = '001'
down_revision = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table(
        'invitacion',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('email', sa.String(250), nullable=False),
        sa.Column('codigo', sa.String(10), nullable=False),
        sa.Column('usada', sa.Boolean, nullable=False, default=False),
    )


def downgrade():
    op.drop_table('invitacion')
