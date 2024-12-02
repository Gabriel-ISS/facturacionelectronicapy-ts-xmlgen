import Table from '../helpers/Table';

export default new Table<{
  0: ['_id', number];
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
