"""gasto

Revision ID: 2d7dd71834d7
Revises: 032
Create Date: 2014-10-18 07:42:22.876984

"""

# revision identifiers, used by Alembic.
revision = '033'
down_revision = '032'

from alembic import op
import sqlalchemy as db


def upgrade():
    op.create_table('gasto',
        db.Column('id', db.Integer, primary_key=True),
        db.Column('id_razon_gasto', db.Integer, db.ForeignKey('razon_gasto.id'), nullable=False),
        db.Column('cuando', db.Date, nullable=False),
        db.Column('mes_correspondiente', db.Date, nullable=False),
        db.Column('importe', db.Float, nullable=False),
        db.Column('comentario', db.Text),
    )




def downgrade():
    op.drop_Table('gasto')
