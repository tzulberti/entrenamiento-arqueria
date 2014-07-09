"""Create asistencias

Revision ID: 1e8e359657ee
Revises: 023
Create Date: 2014-07-09 07:56:17.015227

"""

# revision identifiers, used by Alembic.
revision = '024'
down_revision = '023'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table('asistencia',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('id_turno', sa.Integer, sa.ForeignKey('turno.id')),
        sa.Column('id_arquero', sa.Integer, sa.ForeignKey('arquero.id')),
        sa.Column('cuando', sa.Date, nullable=False),
    )
    op.create_unique_constraint("asistencia_turno_arquero_cuando", "asistencia", ['id_turno', 'id_arquero', 'cuando'])



def downgrade():
    op.drop_table('asistencia')
