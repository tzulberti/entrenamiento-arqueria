"""add missing usuario fields

Revision ID: 514ba03e3483
Revises: 2406fdfebae
Create Date: 2014-03-16 16:03:44.583716

"""

# revision identifiers, used by Alembic.
revision = '514ba03e3483'
down_revision = '2406fdfebae'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.add_column('usuario',
                  sa.Column('fecha_ingreso', sa.Date))
    op.add_column('usuario',
                  sa.Column('fecha_nacimiento', sa.Date))
    op.add_column('usuario',
                  sa.Column('telefono', sa.String(1024)))
    op.add_column('usuario',
                  sa.Column('celular', sa.String(1024)))
    op.add_column('usuario',
                  sa.Column('direccion', sa.String(1024)))
    op.add_column('usuario',
                  sa.Column('localidad', sa.String(1024)))
    op.add_column('usuario',
                  sa.Column('dni', sa.String(1024)))
    op.add_column('usuario',
                  sa.Column('apodo_eda', sa.String(1024)))


def downgrade():
    op.drop_column('usuario', 'fecha_ingreso')
    op.drop_column('usuario', 'fecha_nacimiento')
    op.drop_column('usuario', 'telefono')
    op.drop_column('usuario', 'celular')
    op.drop_column('usuario', 'direccion')
    op.drop_column('usuario', 'localidad')
    op.drop_column('usuario', 'dni')
    op.drop_column('usuario', 'apodo_eda')
