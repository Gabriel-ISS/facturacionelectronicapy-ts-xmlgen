import { BasicData } from '../services/constants.service';

export enum CreditCardProcessingMethod {
  POS = 1,
  PAGO_ELECTRONICO = 2,
  OTRO = 9,
}

export const creditCardProcessingMethods: BasicData<CreditCardProcessingMethod>[] = [
  {
    _id: CreditCardProcessingMethod.POS,
    description: 'POS',
  },
  {
    _id: CreditCardProcessingMethod.PAGO_ELECTRONICO,
    description: 'Pago Electrónico',
  },
  {
    _id: CreditCardProcessingMethod.OTRO,
    description: 'Otro',
  },
];
