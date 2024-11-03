import { BasicData } from '../services/constants.service';

export enum CreditType {
  PLAZO = 1,
  CUOTA = 2,
}

export const creditTypes: BasicData<CreditType>[] = [
  {
    _id: CreditType.PLAZO,
    description: 'Plazo',
  },
  {
    _id: CreditType.CUOTA,
    description: 'Cuota',
  },
];
