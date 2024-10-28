import { BasicData } from '../services/constants.service';

export enum PresenceIndicator {
  OPERACION_PRESENCIAL = 1,
  OPERACION_ELECTRONICA = 2,
  OPERACION_TELEMARKETING = 3,
  VENTA_A_DOMICILIO = 4,
  OPERACION_BANCARIA = 5,
  OPERACION_CICLICA = 6,
  OTRO = 9,
}

export const presenceIndicators: BasicData<PresenceIndicator>[] = [
  {
    code: PresenceIndicator.OPERACION_PRESENCIAL,
    description: 'Operación presencial',
  },
  {
    code: PresenceIndicator.OPERACION_ELECTRONICA,
    description: 'Operación electrónica',
  },
  {
    code: PresenceIndicator.OPERACION_TELEMARKETING,
    description: 'Operación telemarketing',
  },
  {
    code: PresenceIndicator.VENTA_A_DOMICILIO,
    description: 'Venta a domicilio',
  },
  {
    code: PresenceIndicator.OPERACION_BANCARIA,
    description: 'Operación bancaria',
  },
  {
    code: PresenceIndicator.OPERACION_CICLICA,
    description: 'Operación cíclica',
  },
  {
    code: PresenceIndicator.OTRO,
    description: 'Otro',
  },
];
