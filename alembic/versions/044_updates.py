"""updates

Revision ID: 044
Revises: 043
Create Date: 2015-02-08 07:36:03.329028

"""

# revision identifiers, used by Alembic.
revision = '044'
down_revision = '043'

from alembic import op
import sqlalchemy as db

def upgrade():
    op.drop_column('usuario', 'fecha_ingreso')
    op.drop_column('usuario', 'fecha_abandono')
    op.drop_column('usuario', 'fecha_nacimiento')
    op.drop_column('usuario', 'telefono')
    op.drop_column('usuario', 'celular')
    op.drop_column('usuario', 'direccion')
    op.drop_column('usuario', 'localidad')
    op.drop_column('usuario', 'dni')
    op.drop_column('usuario', 'apodo_eda')
    op.drop_column('usuario', 'id_dominancia_ojo')
    op.drop_column('usuario', 'id_dominancia_mano')
    op.drop_column('usuario', 'foto')
    op.drop_column('usuario', 'latitud')
    op.drop_column('usuario', 'longitud')

    op.add_column('arquero', db.Column('fecha_ingreso', db.Date))
    op.add_column('arquero', db.Column('fecha_abandono', db.Date))
    op.add_column('arquero', db.Column('fecha_nacimiento', db.Date))
    op.add_column('arquero', db.Column('telefono', db.String(1024)))
    op.add_column('arquero', db.Column('celular', db.String(1024)))
    op.add_column('arquero', db.Column('direccion', db.String(1024)))
    op.add_column('arquero', db.Column('localidad', db.String(1024)))
    op.add_column('arquero', db.Column('dni', db.String(20)))
    op.add_column('arquero', db.Column('apodo_eda', db.String(1024)))
    op.add_column('arquero', db.Column('id_dominancia_ojo', db.Integer, db.ForeignKey('dominancia_ojo.id')))
    op.add_column('arquero', db.Column('id_dominancia_mano', db.Integer, db.ForeignKey('dominancia_mano.id')))
    op.add_column('arquero', db.Column('codigo_postal', db.String(20)))
    op.add_column('arquero', db.Column('foto', db.String(1024)))
    op.add_column('arquero', db.Column('latitud', db.Float))
    op.add_column('arquero', db.Column('longitud', db.Float))

    op.add_column('torneo', db.Column('posicion_classificacion', db.Integer))
    op.add_column('torneo', db.Column('posicion_eliminatoria', db.Integer))


def downgrade():
    op.drop_column('torneo', 'posicion_classificacion')
    op.drop_column('torneo', 'posicion_eliminatoria')

    op.drop_column('arquero', 'fecha_ingreso')
    op.drop_column('arquero', 'fecha_abandono')
    op.drop_column('arquero', 'fecha_nacimiento')
    op.drop_column('arquero', 'telefono')
    op.drop_column('arquero', 'celular')
    op.drop_column('arquero', 'direccion')
    op.drop_column('arquero', 'localidad')
    op.drop_column('arquero', 'dni')
    op.drop_column('arquero', 'apodo_eda')
    op.drop_column('arquero', 'id_dominancia_ojo')
    op.drop_column('arquero', 'id_dominancia_mano')
    op.drop_column('arquero', 'codigo_postal')
    op.drop_column('arquero', 'foto')
    op.drop_column('arquero', 'latitud')
    op.drop_column('arquero', 'longitud')


    op.add_column('usuario', db.Column('fecha_ingreso', db.Date))
    op.add_column('usuario', db.Column('fecha_abandono', db.Date))
    op.add_column('usuario', db.Column('fecha_nacimiento', db.Date))
    op.add_column('usuario', db.Column('telefono', db.String(1024)))
    op.add_column('usuario', db.Column('celular', db.String(1024)))
    op.add_column('usuario', db.Column('direccion', db.String(1024)))
    op.add_column('usuario', db.Column('localidad', db.String(1024)))
    op.add_column('usuario', db.Column('dni', db.String(20)))
    op.add_column('usuario', db.Column('apodo_eda', db.String(1024)))
    op.add_column('usuario', db.Column('id_dominancia_ojo', db.Integer, db.ForeignKey('dominancia_ojo.id')))
    op.add_column('usuario', db.Column('id_dominancia_mano', db.Integer, db.ForeignKey('dominancia_mano.id')))
    op.add_column('usuario', db.Column('foto', db.String(1024)))
    op.add_column('usuario', db.Column('latitud', db.Float))
    op.add_column('usuario', db.Column('longitud', db.Float))


