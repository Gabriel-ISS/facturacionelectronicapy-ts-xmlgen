import Table from '../helpers/Table';

export enum TransportType {
  PROPIO = 1,
  TERCERO = 2,
}

export default new Table<{
  0: ['_id', TransportType];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [1, 'Propio'],
    [2, 'Tercero'],
  ],
);
