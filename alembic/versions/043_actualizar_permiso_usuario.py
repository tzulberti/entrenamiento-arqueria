"""Actualizar permiso_usuario

Revision ID: 043
Revises: 042
Create Date: 2015-01-21 06:59:13.639539

"""

# revision identifiers, used by Alembic.
revision = '043'
down_revision = '042'

from alembic import op
import sqlalchemy as db

def upgrade():
    op.drop_table('permiso_usuario')

    op.create_table('permiso_usuario',
        db.Column('id', db.Integer, primary_key=True),
        db.Column('id_usuario', db.Integer, db.ForeignKey('usuario.id', ondelete='CASCADE'), nullable=False),
        db.Column('id_permiso', db.Integer, db.ForeignKey('permiso.id', ondelete='CASCADE'), nullable=False),
    )


def downgrade():
    pass

