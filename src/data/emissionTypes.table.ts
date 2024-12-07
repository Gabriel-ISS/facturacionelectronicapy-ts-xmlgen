import Table from '../helpers/Table';

export enum EmissionType {
  NORMAL = 1,
  CONTINGENCIA = 2,
}

export default new Table<{
  0: ['_id', EmissionType];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [1, 'Normal'],
    [2, 'Contingencia'],
  ],
);
