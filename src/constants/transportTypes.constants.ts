import { BasicData } from '../services/constants.service';

export enum TransportType {
  PROPIO = 1,
  TERCERO = 2,
}

export const transportTypes: BasicData<TransportType>[] = [
  {
    _id: TransportType.PROPIO,
    description: 'Propio',
  },
  {
    _id: TransportType.TERCERO,
    description: 'Tercero',
  },
];
