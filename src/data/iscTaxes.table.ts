import Table from '../helpers/Table';

export enum IscTax {
  AT_1 = 1,
  AT_5 = 2,
  AT_9 = 3,
  AT_10 = 4,
  AT_11 = 5,
  AT_13 = 6,
  AT_16 = 7,
  AT_18 = 8,
  AT_20 = 9,
  AT_24 = 10,
  AT_34 = 11,
  AT_38 = 12,
}

export default new Table<{
  0: ['_id', IscTax];
  1: ['percentage', number];
}>(
  ['_id', 'percentage'],
  [
    [1, 1],
    [2, 5],
    [3, 9],
    [4, 10],
    [5, 11],
    [6, 13],
    [7, 16],
    [8, 18],
    [9, 20],
    [10, 24],
    [11, 34],
    [12, 38],
  ],
);
