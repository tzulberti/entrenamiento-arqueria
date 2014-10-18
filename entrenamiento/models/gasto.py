# -*- coding: utf-8 -*-

from entrenamiento.app.app import db
from entrenamiento.models.base import BaseModel

class Gasto(BaseModel):
    ''' Tiene toda la informacion correspondiente a un gasto de la escuela.

    Los gastos de la escuela pueden ser de varios tipos:

    - sueldos
    - gasto en alquileres
    - compra de equipo
    - otras cosas

    :param int id: el identificador del pago.

    :param date cuando: cuando es que el gasto fue hecho. No cuando
                        el gasto fue registrado en el sistma, sino
                        cuando fue hecho el mismo.

    :param date mes_correspondiente: a que mes corresponde el gasto.
                                     Este campo es necesario ademas,
                                     del :attr:`cuando`, para tener
                                     en cuenta los casos en donde uno
                                     paga mas de un mes atrasado.

    :param float importe: el importe que pago el usuario en cuestion.

    :param int razon_gasto: el identificador de la razon del pago hecha
                           por el usuario.

    :param str comentario: algun comentario sobre el pago que realizo el
                           usuario
    '''

    id = db.Column(db.Integer, primary_key=True)
    id_razon_gasto = db.Column(db.Integer, db.ForeignKey('razon_gasto.id'), nullable=False)
    cuando = db.Column(db.Date, nullable=False)
    mes_correspondiente = db.Column(db.Date, nullable=False)
    importe = db.Column(db.Float, nullable=False)
    comentario = db.Column(db.Text)


