import Table from '../helpers/Table';

export enum OperatingCondition {
  CONTADO = 1,
  CREDITO = 2,
}

export default new Table<{
  0: ['_id', OperatingCondition];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [1, 'Contado'],
    [2, 'Crédito'],
  ],
);
