"""entrenamiento_flechas

Revision ID: 031
Revises: 030
Create Date: 2014-08-05 22:56:36.941401

"""

# revision identifiers, used by Alembic.
revision = '031'
down_revision = '030'

from alembic import op
import sqlalchemy as db


def upgrade():
    op.create_table('entrenamiento_flechas',
        db.Column('id', db.Integer, primary_key=True),
        db.Column('id_entrenamiento_realizado',
                  db.Integer,
                  db.ForeignKey('entrenamiento_realizado.id', ondelete='CASCADE'),
                  nullable=False),
        db.Column('hora_inicio', db.Time),
        db.Column('cantidad_de_flechas', db.Integer),
        db.Column('distancia', db.Integer),
        db.Column('id_arco', db.Integer,
                            db.ForeignKey('arco.id')),
        db.Column('id_lugar', db.Integer,
                            db.ForeignKey('lugar.id')),
    )



def downgrade():
    op.drop_table('entrenamiento_flechas')
