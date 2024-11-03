import { BasicData } from '../services/constants.service';

export enum CreditCard {
  VISA = 1,
  MASTERCARD = 2,
  AMERICAN_EXPRESS = 3,
  MAESTRO = 4,
  PANAL = 5,
  CABAL = 6,
  OTRO = 99,
}

export const creditCards: BasicData<CreditCard>[] = [
  {
    _id: CreditCard.VISA,
    description: 'Visa',
  },
  {
    _id: CreditCard.MASTERCARD,
    description: 'Mastercard',
  },
  {
    _id: CreditCard.AMERICAN_EXPRESS,
    description: 'American Express',
  },
  {
    _id: CreditCard.MAESTRO,
    description: 'Maestro',
  },
  {
    _id: CreditCard.PANAL,
    description: 'Panal',
  },
  {
    _id: CreditCard.CABAL,
    description: 'Cabal',
  },
  {
    _id: CreditCard.OTRO,
    description: 'Otro',
  },
];
