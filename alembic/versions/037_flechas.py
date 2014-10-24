"""flechas

Revision ID: 037
Revises: 036
Create Date: 2014-10-22 08:35:30.469310

"""

# revision identifiers, used by Alembic.
revision = '037'
down_revision = '036'

from alembic import op
import sqlalchemy as db


def upgrade():
    op.create_table('flechas',
        db.Column('id', db.Integer, primary_key=True, nullable=False),
        db.Column('id_usuario', db.Integer,
                            db.ForeignKey('usuario.id', ondelete='CASCADE'),
                            nullable=False),
        db.Column('comentario', db.Text),

        db.Column('id_tipo_uso', db.Integer,
                                db.ForeignKey('tipo_uso_flechas.id'),
                                nullable=False),

        db.Column('id_marca_flechas', db.Integer,
                                    db.ForeignKey('marca_flechas.id'),
                                    nullable=False),

        db.Column('id_modelo_flechas', db.Integer,
                                    db.ForeignKey('modelo_flechas.id'),
                                    nullable=False),

        db.Column('calibre_flechas', db.Integer),
        db.Column('punta', db.Integer),
        db.Column('largo', db.Float),
        db.Column('info_nock', db.String(1024)),
        db.Column('info_timones', db.String(1024)),
    )

def downgrade():
    op.drop_table('flechas')
