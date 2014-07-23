"""Update invitaciones

Revision ID: 027
Revises: 026
Create Date: 2014-07-23 08:48:18.048104

"""

# revision identifiers, used by Alembic.
revision = '027'
down_revision = '026'

from alembic import op
import sqlalchemy as sa

def upgrade():
    op.drop_column('invitacion', 'email')
    op.add_column('invitacion',
                  sa.Column('id_arquero', sa.Integer, sa.ForeignKey('arquero.id')))

    op.drop_column('usuario', 'codigo')
    op.add_column('arquero',
                  sa.Column('codigo', sa.String(10), unique=True))

    # tengo que buscar todos los arqueros y a cada uno de ellos setearle
    # un codigo random
    op.execute("UPDATE arquero SET codigo = substring(md5(random()::text) from 1 for 10)")
    op.alter_column('arquero', 'codigo', nullable=False)

def downgrade():
    op.drop_column('invitacion', 'id_arquero')
    op.add_column('invitacion',
                  sa.Column('email', sa.String(250), nullable=False))

    op.drop_column('arquero', 'codigo')
    op.add_column('usuario',
                  sa.Column('codigo', sa.String(10), unique=True))

    op.execute("UPDATE usuario SET codigo = substring(md5(random()::text) from 1 for 10)")
    op.alter_column('usuario', 'codigo', nullable=False)

