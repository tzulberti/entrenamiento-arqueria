# -*- encoding: utf-8 -*-

from alembic import op
import sqlalchemy as sa

def create_categoric_table(table_name, values):
    ''' Se encarga de crear la tabla categorica, y de especificar todos los
    valores de la misma.

    :param str table_name: el nombre de la tabla categorica

    :param list(str) values: los textos que se le muestran al usuario
                             en el orden en el que se le tienen que mostrar
                             los mismos
    '''
    op.create_table(table_name,
                    sa.Column('id', sa.Integer, primary_key=True),
                    sa.Column('value', sa.String(1024), unique=True, nullable=False),
                    sa.Column('show_order', sa.Integer, unique=True, nullable=False))
    sql = "INSERT INTO {table_name} (id, value, show_order) VALUES ({id}, '{value}', '{show_order}');"
    for id, value in enumerate(values):
        insert_sql = sql.format(table_name=table_name,
                                id=id + 1,
                                value=value,
                                show_order=id + 1)
        op.execute(insert_sql)


