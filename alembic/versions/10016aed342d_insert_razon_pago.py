"""Insert razon pago

Revision ID: 10016aed342d
Revises: 180a31675313
Create Date: 2014-05-07 06:45:18.747102

"""

# revision identifiers, used by Alembic.
revision = '10016aed342d'
down_revision = '180a31675313'

from alembic import op
import sqlalchemy as sa


def upgrade():
    razon_pago = [
        dict(id=1,
             value='Cuota EDA',
             show_order=1),
        dict(id=2,
             value='Cuota FATARCO',
             show_order=2),
        dict(id=3,
             value='Inscripcion Torneo',
             show_order=3),
    ]
    for values in razon_pago:
        sql = "INSERT INTO razon_pago (id, value, show_order) VALUES ({id}, '{value}', {show_order})".format(**values)
        op.execute(sql)

    pass


def downgrade():
    op.execute('DELETE FROM razon_pago');
