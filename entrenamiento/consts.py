# -*- coding: utf-8 -*-

from entrenamiento.models.arquero import Arquero
from entrenamiento.models.asistencia import Asistencia
from entrenamiento.models.gasto import Gasto
from entrenamiento.models.invitacion import Invitacion
from entrenamiento.models.lugar import Lugar
from entrenamiento.models.usuario import Usuario
from entrenamiento.models.arco import Arco, ArcoRecurvado
from entrenamiento.models.pago import Pago
from entrenamiento.models.torneo import Torneo, Ronda, Serie
from entrenamiento.models.turno import Turno
from entrenamiento.models.tipo_torneo import TipoTorneo
from entrenamiento.models.historia_estado_arquero import HistoriaEstadoArquero
from entrenamiento.models.entrenamiento_realizado import (EntrenamientoRealizado,
                                                          EntrenamientoFlechas)
from entrenamiento.models.flechas import Flechas
from entrenamiento.models.tipo_dia_especial import TipoDiaEspecial
from entrenamiento.models.fechas_especiales import FechaEspecial
from entrenamiento.models.permiso import PermisoUsuario, Permiso



#: Mapea como es que se llama el modelo cuando se lo usa desde javascript
#: para saber con que modelo se tiene que mapear el mismo
JAVASCRIPT_MODEL_MAPPER=dict(
    arquero=Arquero,
    asistencia=Asistencia,
    gasto=Gasto,
    invitacion=Invitacion,
    lugar=Lugar,
    usuario=Usuario,
    arco=Arco,
    arco_recurvado=ArcoRecurvado,
    pago=Pago,
    torneo=Torneo,
    ronda=Ronda,
    serie=Serie,
    turno=Turno,
    tipo_torneo=TipoTorneo,
    historia_estado_arquero=HistoriaEstadoArquero,
    entrenamiento_realizado=EntrenamientoRealizado,
    entrenamiento_flechas=EntrenamientoFlechas,
    flechas=Flechas,
    tipo_dia_especial=TipoDiaEspecial,
    fecha_especial=FechaEspecial,
    permiso=Permiso,
    permiso_usuario=PermisoUsuario
)
