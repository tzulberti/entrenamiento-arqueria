"""permiso

Revision ID: 038
Revises: 037
Create Date: 2014-12-04 07:16:49.635626

"""

# revision identifiers, used by Alembic.
revision = '038'
down_revision = '037'

from alembic import op
import sqlalchemy as db


def upgrade():
    op.create_table('permiso',
        db.Column('id', db.Integer, primary_key=True),
        db.Column('value', db.Text, unique=True),
    )
    sql = u"INSERT INTO permiso (id, value) VALUES ({id}, '{value}');"
    values = [
        'es_entrenador',
        'es_comision_revisora',
        'es_de_tesoreria',
        'es_secretario',
        'es_vocal',
    ]
    for id, value in enumerate(values):
        insert_sql = sql.format(id=id + 1,
                                value=value)
        op.execute(insert_sql)



def downgrade():
    op.drop_table('permiso')
