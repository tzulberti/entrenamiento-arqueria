"""flechas

Revision ID: 256d5b69954d
Revises: 2177dc7f874b
Create Date: 2014-01-08 07:25:19.523511

"""

# revision identifiers, used by Alembic.
revision = '256d5b69954d'
down_revision = '2177dc7f874b'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table(
        'flechas',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('nombre', sa.Text, nullable=False),
        sa.Column('modelo', sa.Text),
        sa.Column('calibre', sa.Text),
        sa.Column('largo', sa.Float),
        sa.Column('modelo_punta', sa.Text),
        sa.Column('grames_punta', sa.Integer),
        sa.Column('modelo_vanes', sa.Text),
        sa.Column('largo_vanes', sa.Integer),
    )


def downgrade():
    op.drop_table('flechas')
