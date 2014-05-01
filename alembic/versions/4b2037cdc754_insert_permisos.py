"""Insert permisos

Revision ID: 4b2037cdc754
Revises: 25371f01682
Create Date: 2014-04-30 21:42:48.479207

"""

# revision identifiers, used by Alembic.
revision = '4b2037cdc754'
down_revision = '25371f01682'

from alembic import op
import sqlalchemy as sa


def upgrade():
    for id, comision in enumerate(['presidente', 'vice presidente', 'secretario',
                                   'tesorero', 'vocal', 'revisor de cuentas']):
        sql = "INSERT INTO permiso (id, value) VALUES ({id}, '{comision}')"
        sql = sql.format(id=id + 1, comision=comision)
        op.execute(sql)


def downgrade():
    op.execute('DELETE FROM permiso')
