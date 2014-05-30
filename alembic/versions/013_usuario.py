"""usuario

Revision ID: 013
Revises: 012
Create Date: 2014-05-27 22:28:32.052345

"""

# revision identifiers, used by Alembic.
revision = '013'
down_revision = '012'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table('usuario',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('email', sa.String(250), nullable=False, unique=True),
        sa.Column('password', sa.String(1024), nullable=False),
        sa.Column('codigo', sa.String(10), nullable=False, unique=True),
        sa.Column('nombre', sa.String(1024), nullable=False),
        sa.Column('apellido', sa.String(1024), nullable=False),
        sa.Column('es_administrador', sa.Boolean, nullable=False, default=False),

        # estos datos son pedidos usados por la data de la EDA
        sa.Column('fecha_ingreso', sa.Date),
        sa.Column('fecha_abandono', sa.Date),
        sa.Column('fecha_nacimiento', sa.Date),
        sa.Column('telefono', sa.String(1024)),
        sa.Column('celular', sa.String(1024)),
        sa.Column('direccion', sa.String(1024)),
        sa.Column('localidad', sa.String(1024)),
        sa.Column('dni', sa.String(20)),
        sa.Column('apodo_eda', sa.String(1024)),
        sa.Column('id_dominancia_ojo', sa.Integer, sa.ForeignKey('dominancia_ojo.id')),
        sa.Column('id_dominancia_mano', sa.Integer, sa.ForeignKey('dominancia_mano.id')),


        sa.Column('foto', sa.String(1024)),
        sa.Column('latitud', sa.Float),
        sa.Column('longitud', sa.Float),

    )



def downgrade():
    op.drop_table('usuario')
