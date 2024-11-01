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
    id: CreditCard.VISA,
    description: 'Visa',
  },
  {
    id: CreditCard.MASTERCARD,
    description: 'Mastercard',
  },
  {
    id: CreditCard.AMERICAN_EXPRESS,
    description: 'American Express',
  },
  {
    id: CreditCard.MAESTRO,
    description: 'Maestro',
  },
  {
    id: CreditCard.PANAL,
    description: 'Panal',
  },
  {
    id: CreditCard.CABAL,
    description: 'Cabal',
  },
  {
    id: CreditCard.OTRO,
    description: 'Otro',
  },
];
