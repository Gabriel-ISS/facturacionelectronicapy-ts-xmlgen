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
    code: CreditCard.VISA,
    description: 'Visa',
  },
  {
    code: CreditCard.MASTERCARD,
    description: 'Mastercard',
  },
  {
    code: CreditCard.AMERICAN_EXPRESS,
    description: 'American Express',
  },
  {
    code: CreditCard.MAESTRO,
    description: 'Maestro',
  },
  {
    code: CreditCard.PANAL,
    description: 'Panal',
  },
  {
    code: CreditCard.CABAL,
    description: 'Cabal',
  },
  {
    code: CreditCard.OTRO,
    description: 'Otro',
  },
];
