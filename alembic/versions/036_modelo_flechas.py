"""modelo_flechas

Revision ID: 036
Revises: 035
Create Date: 2014-10-18 10:15:27.483639

"""

# revision identifiers, used by Alembic.
revision = '036'
down_revision = '035'

import inspect
import imp
import os
from alembic import op

def upgrade():
    utils_path = os.path.join(os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe()))),
                       '..',
                       'utils.py')

    utils = imp.load_source('', utils_path)
    utils.create_categoric_table('modelo_flechas',
                                [
                                    'Otra',
                                    'Beman Diva',
                                    'Black Eagle X-Impact',
                                    'Black Eagle Magnum',
                                    'Black Eagle Deep Impact',
                                    'Black Eagle Challenger',
                                    'Muddy BloodSport One Select',
                                    'Muddy BloodSport One Elite',
                                    'Muddy BloodSport Two Select',
                                    'Muddy BloodSport Two Elite',
                                    'Muddy BloodSport Tournament Three Select',
                                    'Muddy BloodSport Tournament Three Elite',
                                    'Muddy BloodSport Tournament Four Select',
                                    'Muddy BloodSport Tournament Four Elite',

                                    'Carbon Express CXL Pro',
                                    'Carbon Express Hot Pursuit',
                                    'Carbon Express LineJammer Pro',
                                    'Carbon Express Mayhem Hot Pursuit',
                                    'Carbon Express Medallion XR',
                                    'Carbon Express Medallion Pro',
                                    'Carbon Express X-Buster',
                                    'Carbon Express X-Jammer',

                                    'Carbon Tech CT Cheetah 3D',
                                    'Carbon Tech CT Cheetah',
                                    'Carbon Tech CT Panther',
                                    'Carbon Tech Hippo',
                                    'Carbon Tech Hippo XR',
                                    'Carbon Tech Mck Junnion',
                                    'Carbon Tech McKinney II',
                                    'Carbon Tech Orca',
                                    'Carbon Tech Orca XP',

                                    'Cartel Arista',
                                    'Cartel Triple',
                                    'Cartel X-Pert',

                                    'Easton XX75 Tribute',
                                    'Easton XX75 Platinum',
                                    'Easton XX75 Jazz',
                                    'Easton X7 Eclipse',
                                    'Easton X27',
                                    'Easton X23',
                                    'Easton LightSpeed',
                                    'Easton LightSpeed 3D',
                                    'Easton Full Bore',
                                    'Easton FatBoy with Super UNI Bushing',
                                    'Easton FatBoy with G-UNI Bushing',
                                    'Easton Epic',
                                    'Easton Carbon Triumph with S-UNI Bushing',
                                    'Easton Carbon Triumph with G-UNI Bushing',
                                    'Easton Carbon One',
                                    'Easton Apollo',
                                    'Easton A/C/C',
                                    'Easton A/C Pro Field',

                                    'Gold Tip Triple X',
                                    'Gold Tip Triple X Pro',
                                    'Gold Tip Ultralight 30X',
                                    'Gold Tip Ultralight 30X Pro',
                                    'Gold Tip Ultralight',
                                    'Gold Tip Ultralight Entrada',
                                    'Gold Tip Ultralight Pro',
                                    'Gold Tip Ultralight Series 32',
                                    'Gold Tip Ultralight Series 32 Pro',
                                    'Gold Tip Ultralight X-Cutter',
                                    'Gold Tip Ultralight X-Cutter Pro',

                                    'PSE Carbon Force EXT 2300',
                                    'PSE Carbon Force EXT 2700',
                                    'PSE Radial X Weave Pro',

                                    'Victory VAP Target (V1)',
                                    'Victory VAP Target (V3)',
                                    'Victory VAP Target (V6)',
                                    'Victory VAP V3',
                                    'Victory VAP V6',
                                    'Victory VForce Pink Arrow Project V3',
                                    'Victory VForce The Pink Arrow Project V3',
                                    'Victory VX-22 V1',
                                    'Victory VX-22 V3',
                                    'Victory VX-22 V6',
                                    'Victory VX-22HV V1',
                                    'Victory VX-22HV V3',
                                    'Victory VX-22HV V5',
                                    'Victory VX-22HV V6',
                                    'Victory VX-23 V1',
                                    'Victory VX-23 V3',
                                    'Victory X-Killer V1',
                                    'Victory X-Killer V5',
                                    'Victory X-Ringer HV V1',
                                    'Victory X-Ringer HV V3',
                                    'Victory X-Ringer HV V5'
                                ])


def downgrade():
    op.drop_table('modelo_flechas')

