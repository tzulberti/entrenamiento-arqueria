"""Turnos

Revision ID: 023
Revises: 022
Create Date: 2014-06-23 07:45:11.330105

"""

# revision identifiers, used by Alembic.
revision = '023'
down_revision = '022'

from alembic import op
import sqlalchemy as db


def upgrade():
    op.create_table('turno',
        db.Column('id', db.Integer, primary_key=True),
        db.Column('id_lugar', db.Integer, db.ForeignKey('lugar.id'), nullable=False),
        db.Column('id_dia_semana', db.Integer, db.ForeignKey('dia_semana.id'), nullable=False),
        db.Column('horario_inicio', db.Time, nullable=False),
        db.Column('horario_fin', db.Time, nullable=False),
    )


def downgrade():
    op.drop_table('turno')
