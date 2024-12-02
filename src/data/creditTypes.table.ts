import Table from '../helpers/Table';

export enum CreditType {
  PLAZO = 1,
  CUOTA = 2,
}

export default new Table<{
  0: ['_id', CreditType];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [1, 'Plazo'],
    [2, 'Cuota'],
  ],
);
