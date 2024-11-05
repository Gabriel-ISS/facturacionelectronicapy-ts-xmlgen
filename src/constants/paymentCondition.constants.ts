import { BasicData } from '../services/constants.service';

export enum PaymentCondition {
  CONTADO = 1,
  CREDITO = 2,
}

export const paymentConditions: BasicData<PaymentCondition>[] = [
  {
    _id: PaymentCondition.CONTADO,
    description: 'Contado',
  },
  {
    _id: PaymentCondition.CREDITO,
    description: 'Crédito',
  },
]