"""Fecha especiales

Revision ID: 041
Revises: 040
Create Date: 2015-01-02 09:04:09.990585

"""

# revision identifiers, used by Alembic.
revision = '041'
down_revision = '040'

from alembic import op
import sqlalchemy as db


def upgrade():
    op.create_table('fecha_especial',
        db.Column('id', db.Integer, primary_key=True),
        db.Column('cuando', db.Date, nullable=False),
        db.Column('id_tipo_dia_especial', db.Integer, db.ForeignKey('tipo_dia_especial.id', ondelete='CASCADE'), nullable=False),
    )

def downgrade():
    op.drop_table('fecha_especial')
