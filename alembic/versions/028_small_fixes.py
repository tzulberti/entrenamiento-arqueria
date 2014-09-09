"""Small fixes

Revision ID: 028
Revises: 027
Create Date: 2014-07-30 09:32:00.563595

"""

# revision identifiers, used by Alembic.
revision = '028'
down_revision = '027'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.drop_constraint('historia_estado_arquero_arquero_desde',
                       'historia_estado_arquero')

    op.drop_constraint('usuario_id_fkey',
                       'usuario')

    #op.drop_column('usuario', 'id')
    #op.add_column('usuario',
    #              sa.Column('id', sa.Integer, primary_key=True, nullable=False))
    op.add_column('usuario',
                  sa.Column('id_arquero', sa.Integer,  sa.ForeignKey('arquero.id')))
    op.execute("UPDATE usuario SET id_arquero = id")
    op.alter_column('usuario', 'id_arquero', nullable=False)






def downgrade():
    raise Exception()
