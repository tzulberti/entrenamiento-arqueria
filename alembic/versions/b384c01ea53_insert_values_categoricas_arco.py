"""Insert values categoricas arco

Revision ID: b384c01ea53
Revises: 56d2aa02e6a7
Create Date: 2014-04-30 21:20:38.539977

"""

# revision identifiers, used by Alembic.
revision = 'b384c01ea53'
down_revision = '56d2aa02e6a7'

from alembic import op


def upgrade():

    largo_palas_values =  [
                dict(id=1,
                     value='66" (Small)',
                     show_order=1),
                dict(id=2,
                     value='70" (Medium)',
                     show_order=2),
                dict(id=3,
                     value='72" (Large)',
                     show_order=3)
        ]
    largo_riser_values = [
                dict(id=1,
                     value='23" (Small)',
                     show_order=1),
                dict(id=2,
                     value='25" (Medium)',
                     show_order=2),
                dict(id=3,
                     value='27" (Large)',
                     show_order=3)
        ]

    for values in largo_palas_values:
        sql = "INSERT INTO largo_palas (id, value, show_order) VALUES ({id}, '{value}', {show_order})".format(**values)
        op.execute(sql)

    for values in largo_riser_values:
        sql = "INSERT INTO largo_riser (id, value, show_order) VALUES ({id}, '{value}', {show_order})".format(**values)
        op.execute(sql)


def downgrade():
    op.execute('DELETE FROM largo_palas');
    op.execute('DELETE FROM largo_riser');
