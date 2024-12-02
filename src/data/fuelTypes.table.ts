import Table from '../helpers/Table';

export enum FuelType {
  GASOLINA = 1,
  DIESEL = 2,
  ETANOL = 3,
  GNV = 4,
  FLEX = 5,
  OTRO = 9,
}

export default new Table<{
  0: ['_id', FuelType];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [1, 'Gasolina'],
    [2, 'Diésel'],
    [3, 'Etanol'],
    [4, 'GNV'],
    [5, 'Flex'],
    [9, 'Otro'],
  ],
);
