import { BasicData } from '../services/constants.service';

export enum CreditType {
  PLAZO = 1,
  CUOTA = 2,
}

export const creditTypes: BasicData<CreditType>[] = [
  {
    id: CreditType.PLAZO,
    description: 'Plazo',
  },
  {
    id: CreditType.CUOTA,
    description: 'Cuota',
  },
];
