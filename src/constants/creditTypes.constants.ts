import { BasicData } from '../services/constants.service';

export enum CreditType {
  PLAZO = 1,
  CUOTA = 2,
}

export const creditTypes: BasicData<CreditType>[] = [
  {
    code: CreditType.PLAZO,
    description: 'Plazo',
  },
  {
    code: CreditType.CUOTA,
    description: 'Cuota',
  },
];
