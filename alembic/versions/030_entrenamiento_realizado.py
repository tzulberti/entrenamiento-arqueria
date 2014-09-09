"""entrenamiento

Revision ID: 030
Revises: 029
Create Date: 2014-08-05 22:52:01.098518

"""

# revision identifiers, used by Alembic.
revision = '030'
down_revision = '029'

from alembic import op
import sqlalchemy as db


def upgrade():
    op.create_table('entrenamiento_realizado',
        db.Column('id', db.Integer, primary_key=True),
        db.Column('id_usuario', db.Integer, db.ForeignKey('usuario.id', ondelete='CASCADE'), nullable=False),
        db.Column('cuando', db.Date, nullable=False),
    )


def downgrade():
    op.drop_table('entrenamiento_realizado')
