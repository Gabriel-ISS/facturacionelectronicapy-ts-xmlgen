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
    id: PresenceIndicator.OPERACION_PRESENCIAL,
    description: 'Operación presencial',
  },
  {
    id: PresenceIndicator.OPERACION_ELECTRONICA,
    description: 'Operación electrónica',
  },
  {
    id: PresenceIndicator.OPERACION_TELEMARKETING,
    description: 'Operación telemarketing',
  },
  {
    id: PresenceIndicator.VENTA_A_DOMICILIO,
    description: 'Venta a domicilio',
  },
  {
    id: PresenceIndicator.OPERACION_BANCARIA,
    description: 'Operación bancaria',
  },
  {
    id: PresenceIndicator.OPERACION_CICLICA,
    description: 'Operación cíclica',
  },
  {
    id: PresenceIndicator.OTRO,
    description: 'Otro',
  },
];
