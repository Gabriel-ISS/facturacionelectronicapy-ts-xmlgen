import Table from '../helpers/Table';

export enum ConstancyType {
  CONSTANCIA_DE_NO_SER_CONTRIBUYENTE = 1,
  CONSTANCIA_DE_MICROPRODUCTORES = 2,
}

export default new Table<{
  0: ['_id', ConstancyType];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [1, 'Constancia de no ser contribuyente'],
    [2, 'Constancia de microproductores'],
  ],
);
