import { BasicData } from '../services/constants.service';

export enum TransportType {
  PROPIO = 1,
  TERCERO = 2,
}

export const transportTypes: BasicData<TransportType>[] = [
  {
    code: TransportType.PROPIO,
    description: 'Propio',
  },
  {
    code: TransportType.TERCERO,
    description: 'Tercero',
  },
];
