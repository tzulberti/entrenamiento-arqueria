# -*- coding: utf-8 -*-

from entrenamiento.app.app import db
from entrenamiento.models.base import BaseModel

class Pago(BaseModel):
    ''' Tiene toda la informacion correspondiente a un pago.

    A diferencia de otros modelos, la informacion de este puede
    ser ingresada por una tercer persona. Por ejemplo, alguien de
    la comision directiva puede agregar un pago a nombre de X
    persona.


    :param int id: el identificador del pago.

    :param date cuando: cuando es que el pago fue hecho. No cuando
                        el pago fue registrado en el sistma, sino
                        cuando fue hecho el mismo.

    :param date mes_correspondiente: a que mes corresponde el pago.
                                     Este campo es necesario ademas,
                                     del :attr:`cuando`, para tener
                                     en cuenta los casos en donde uno
                                     paga mas de un mes atrasado.

    :param float importe: el importe que pago el usuario en cuestion.

    :param int razon_pago: el identificador de la razon del pago hecha
                           por el usuario.

    :param str foto_comprobante: el path al documento en donde el usuario
                                 pasa la informacion del comprobante de pago
                                 (puede ser un PDF, una foto, etc...)

    :param str comentario: algun comentario sobre el pago que realizo el
                           usuario

    :param int usuario: el usuario que hizo el pago.

    :param int cargado_por: el usuario que cargo el pago. Si uno mismo
                            esta cargando un pago a su nombre entonces
                            el valor de este campo es el mismo que usuario.
                            Pero si la Comision esta cargando un pago
                            a nombre de otro, este es el nombre de la
                            persona de la comision, y el :attr:`usuario`
                            es la persona que hizo el pago.

    '''

    id = db.Column(db.Integer, primary_key=True)
    id_razon_pago = db.Column(db.Integer, db.ForeignKey('razon_pago.id'), nullable=False)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    id_cargado_por = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    cuando = db.Column(db.Date, nullable=False)
    mes_correspondiente = db.Column(db.Date, nullable=False)
    importe = db.Column(db.Float, nullable=False)
    comprobante = db.Column(db.Text)
    comentario = db.Column(db.Text)


