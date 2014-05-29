"""tipo torneo

Revision ID: 016
Revises: 015
Create Date: 2014-05-27 22:50:52.173711

"""

# revision identifiers, used by Alembic.
revision = '017'
down_revision = '016'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table('tipo_torneo',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('nombre', sa.String(256), nullable=False),
        sa.Column('tipo', sa.String(256), nullable=False),
        sa.Column('es_escuela', sa.Boolean, nullable=False),
        sa.Column('numero_de_rondas', sa.Integer, nullable=False),
        sa.Column('numero_de_series', sa.Integer, nullable=False),
        sa.Column('numero_de_flechas_por_serie', sa.Integer, nullable=False),
        sa.Column('distancia_ronda_1', sa.Integer, nullable=False),
        sa.Column('series_de_practica_ronda_1', sa.Integer, nullable=False),
        sa.Column('distancia_ronda_2', sa.Integer, nullable=False),
        sa.Column('series_de_practica_ronda_2', sa.Integer, nullable=False),
        # partir de la 3 ronda, si puede llegar a ser null porque dependiendo
        # del tipo de torneo tenemos que no puede haber una tercer ronda
        sa.Column('distancia_ronda_3', sa.Integer),
        sa.Column('series_de_practica_ronda_3', sa.Integer),
        sa.Column('distancia_ronda_4', sa.Integer),
        sa.Column('series_de_practica_ronda_4', sa.Integer),
    )
    data = [
        ('18m - 80', 'Indoor', True, 2, 10, 3, 18, 2, 18, 0, None, None, None, None),
        ('18m - 60', 'Indoor', True, 2, 10, 3, 18, 2, 18, 0, None, None, None, None),
        ('18m - 40', 'Indoor', True, 2, 10, 3, 18, 2, 18, 0, None, None, None, None),
        ('18m - Triple Spot', 'Indoor', False, 2, 10, 3, 18, 2, 18, 0, None, None, None, None),

        ('20-20', 'Outdoor 70-70', True, 2, 6, 6, 20, 2, 20, 0, None, None, None, None),
        ('30-30', 'Outdoor 70-70', True, 2, 6, 6, 30, 2, 30, 0, None, None, None, None),
        ('50-50', 'Outdoor 70-70', True, 2, 6, 6, 50, 2, 50, 0, None, None, None, None),
        ('60-60', 'Outdoor 70-70', False, 2, 6, 6, 60, 2, 60, 0, None, None, None, None),
        ('70-70', 'Outdoor 70-70', False, 2, 6, 6, 70, 2, 70, 0, None, None, None, None),



        ('20-20-20-20', 'Outdoor 1440', True, 4, 6, 6, 20, 2, 20, 2, 20, 2, 20, 2),
        ('30-30-20-20', 'Outdoor 1440', True, 4, 6, 6, 30, 2, 30, 2, 20, 2, 20, 2),
        ('50-50-30-30', 'Outdoor 1440', True, 4, 6, 6, 50, 2, 50, 2, 30, 2, 30, 2),
        ('60-50-40-30', 'Outdoor 1440', True, 4, 6, 6, 60, 2, 50, 2, 30, 2, 30, 2),
        ('70-60-50-30', 'Outdoor 1440', True, 4, 6, 6, 70, 2, 60, 2, 50, 2, 30, 2),
        ('70-60-50-30 (Cadete Varones)', 'Outdoor 1440', False, 4, 6, 6, 70, 2, 60, 2, 50, 2, 30, 2),
        ('60-50-40-30 (Cadete Mujeres)', 'Outdoor 1440', False, 4, 6, 6, 60, 2, 50, 2, 40, 2, 30, 2),
        ('70-60-50-30 (Juvenil Mujeres)', 'Outdoor 1440', False, 4, 6, 6, 70, 2, 60, 2, 50, 2, 30, 2),
        ('90-70-50-30 (Juvenil Varones)', 'Outdoor 1440', False, 4, 6, 6, 90, 2, 70, 2, 50, 2, 30, 2),
        ('70-60-50-30 (Senior Mujeres)', 'Outdoor 1440', False, 4, 6, 6, 70, 2, 60, 2, 50, 2, 30, 2),
        ('90-70-50-30 (Senior Varones)', 'Outdoor 1440', False, 4, 6, 6, 90, 2, 70, 2, 50, 2, 30, 2),
        ('70-60-50-30 (Master Varones)', 'Outdoor 1440', False, 4, 6, 6, 70, 2, 60, 2, 50, 2, 30, 2),
        ('60-50-40-30 (Master Mujeres)', 'Outdoor 1440', False, 4, 6, 6, 60, 2, 50, 2, 40, 2, 30, 2),
    ]

    for index, valores in enumerate(data):
        sql = 'INSERT INTO tipo_torneo (id, '\
                                        'nombre, '\
                                        'tipo, '\
                                        'es_escuela, '\
                                        'numero_de_rondas, '\
                                        'numero_de_series, '\
                                        'numero_de_flechas_por_serie, '\
                                        'distancia_ronda_1, '\
                                        'series_de_practica_ronda_1, '\
                                        'distancia_ronda_2, '\
                                        'series_de_practica_ronda_2 '

        if valores[-1]:
            # entonces tiene la informacion de la 3 y 4 ronda
            sql += ', '\
                   'distancia_ronda_3, '\
                   'series_de_practica_ronda_3, '\
                   'distancia_ronda_4, '\
                   'series_de_practica_ronda_4'
        sql += ') VALUES ('\
                    "%s, "\
                    "'%s', "\
                    "'%s', "\
                    "%s, "\
                    "%s, "\
                    "%s, "\
                    "%s, "\
                    "%s, "\
                    "%s, "\
                    "%s, "\
                    "%s "
        if valores[-1]:
            sql += ', '\
                   '%s, '\
                   '%s, '\
                   '%s, '\
                   '%s'
        sql += ')'
        if not valores[-1]:
            valores = valores[:-4]
        sql_values = (index + 1, ) + valores
        insert_sql = sql % sql_values

        op.execute(insert_sql)






def downgrade():
    op.drop_table('tipo_torneo')
