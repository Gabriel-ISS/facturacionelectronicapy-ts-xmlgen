import Table from '../../helpers/Table';

export enum GlobalAndPerItem {
  GLOBAL = 1,
  POR_ITEM = 2,
}

export default new Table<{
  0: ['_id', GlobalAndPerItem];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [1, 'Global'],
    [2, 'Por item'],
  ],
);