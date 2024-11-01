import { BasicData } from '../services/constants.service';

export enum TransportType {
  PROPIO = 1,
  TERCERO = 2,
}

export const transportTypes: BasicData<TransportType>[] = [
  {
    id: TransportType.PROPIO,
    description: 'Propio',
  },
  {
    id: TransportType.TERCERO,
    description: 'Tercero',
  },
];
