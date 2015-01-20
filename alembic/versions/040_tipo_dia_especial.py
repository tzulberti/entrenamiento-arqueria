"""Tipo Dia Especial

Revision ID: 040
Revises: 039
Create Date: 2015-01-02 08:47:54.537282

"""

# revision identifiers, used by Alembic.
revision = '040'
down_revision = '039'

from alembic import op
import sqlalchemy as db


def upgrade():
    op.create_table('tipo_dia_especial',
        db.Column('id', db.Integer, primary_key=True),
        db.Column('value', db.Text, unique=True, nullable=False),
        db.Column('color', db.Text, nullable=False),
    )
    sql = u"INSERT INTO tipo_dia_especial (id, value, color) VALUES ({id}, '{value}', '{color}');"
    values = [
        ('Feriado nacional', '669999'),
        ('Torneo homologatorio de nuestra region', 'E80909'),
        ('Torneo homologatorio de otra region', 'ED3737'),
        ('Torneo rankeable', 'F56767'),
        ('Torneo indoor', '0099FF'),
        ('Final nacional indoor', '000099'),
        ('Final regional indoor', '0000FF'),
        ('Final nacional outdoor', 'F037DA'),
        ('Final regional outdoor', 'F207D7'),
        ('Clinica de entrenamiento', '00FF00'),
    ]
    for id, value in enumerate(values):
        insert_sql = sql.format(id=id + 1,
                                value=value[0],
                                color=value[1])
        op.execute(insert_sql)


def downgrade():
    op.drop_table('tipo_dia_especial')
