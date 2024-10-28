import { BasicData } from '../services/constants.service';

export enum CreditCardProcessingMethod {
  POS = 1,
  PAGO_ELECTRONICO = 2,
  OTRO = 9,
}

export const creditCardProcessingMethods: BasicData<CreditCardProcessingMethod>[] = [
  {
    code: CreditCardProcessingMethod.POS,
    description: 'POS',
  },
  {
    code: CreditCardProcessingMethod.PAGO_ELECTRONICO,
    description: 'Pago Electrónico',
  },
  {
    code: CreditCardProcessingMethod.OTRO,
    description: 'Otro',
  },
];
