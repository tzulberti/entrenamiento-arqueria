"""usuario_permiso

Revision ID: 039
Revises: 038
Create Date: 2014-12-04 07:19:25.865846

"""

# revision identifiers, used by Alembic.
revision = '039'
down_revision = '038'

from alembic import op
import sqlalchemy as db


def upgrade():
    op.create_table('permiso_usuario',
        db.Column('usuario', db.Integer, db.ForeignKey('usuario.id'), nullable=False),
        db.Column('permiso', db.Integer, db.ForeignKey('permiso.id'), nullable=False),
    )


def downgrade():
    op.drop_table('permiso_usuario')
