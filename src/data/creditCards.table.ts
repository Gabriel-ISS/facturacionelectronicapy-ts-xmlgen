import Table from '../helpers/Table';

export enum CreditCard {
  VISA = 1,
  MASTERCARD = 2,
  AMERICAN_EXPRESS = 3,
  MAESTRO = 4,
  PANAL = 5,
  CABAL = 6,
  OTRO = 99,
}

export default new Table<{
  0: ['_id', CreditCard];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [1, 'Visa'],
    [2, 'Mastercard'],
    [3, 'American Express'],
    [4, 'Maestro'],
    [5, 'Panal'],
    [6, 'Cabal'],
    [99, 'Otro'],
  ],
);
