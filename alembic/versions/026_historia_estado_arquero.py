"""historia estado arquero

Revision ID: 026
Revises: 025
Create Date: 2014-07-16 06:41:19.801390

"""

# revision identifiers, used by Alembic.
revision = '026'
down_revision = '025'

from alembic import op
import sqlalchemy as db


def upgrade():
    op.create_table('historia_estado_arquero',
        db.Column('id', db.Integer, primary_key=True),
        db.Column('id_arquero', db.Integer, db.ForeignKey('arquero.id'), nullable=False),
        db.Column('id_estado_arquero', db.Integer, db.ForeignKey('estado_arquero.id'), nullable=False),
        db.Column('desde', db.Date, nullable=False),
        db.Column('hasta', db.Date),
    )

    op.create_unique_constraint("historia_estado_arquero_arquero_desde", "historia_estado_arquero", ['id_arquero', 'desde'])


def downgrade():
    op.drop_table('historia_estado_arquero')
