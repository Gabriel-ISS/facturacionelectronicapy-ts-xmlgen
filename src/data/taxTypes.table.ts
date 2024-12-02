import Table from '../helpers/Table';

export enum TaxType {
  IVA = 1,
  ISC = 2,
  RENTA = 3,
  NINGUNO = 4,
  IVA___RENTA = 5,
}

export default new Table<{
  0: ['_id', TaxType];
  1: ['description', string];
  2: ['state', number];
}>(
  ['_id', 'description', 'state'],
  [
    [1, 'IVA', 0],
    [2, 'ISC', 1],
    [3, 'Renta', 1],
    [4, 'Ninguno', 0],
    [5, 'IVA - Renta', 0],
  ],
);
