import Table from '../helpers/Table';

export enum MerchandiseRelevance {
  TOLERANCIA_DE_QUIEBRA = 1,
  TOLERANCIA_DE_MERMA = 2,
}

export default new Table<{
  0: ['_id', MerchandiseRelevance];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [1, 'Tolerancia de quiebra'],
    [2, 'Tolerancia de merma'],
  ],
);
