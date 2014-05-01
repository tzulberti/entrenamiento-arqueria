"""Create permissions

Revision ID: 25371f01682
Revises: b384c01ea53
Create Date: 2014-04-30 21:38:37.470761

"""

# revision identifiers, used by Alembic.
revision = '25371f01682'
down_revision = 'b384c01ea53'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table('permiso',
            sa.Column('id', sa.Integer, primary_key=True),
            sa.Column('value', sa.Text, unique=True))
    op.create_table('permisos_usuarios',
            sa.Column('id_usuario', sa.Integer, sa.ForeignKey('usuario.id')),
            sa.Column('id_permiso', sa.Integer, sa.ForeignKey('permiso.id')))

def downgrade():
    op.drop_table('permiso')
    op.drop_talbe('permisos_usuarios')

