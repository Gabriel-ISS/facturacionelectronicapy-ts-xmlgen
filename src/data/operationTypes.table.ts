import Table from '../helpers/Table';

export enum OperationType {
  B2B = 1,
  B2C = 2,
  B2G = 3,
  /**Esta última opción debe utilizarse
  solo en caso de servicios para
  empresas o personas físicas del
  exterior */
  B2F = 4,
}

export enum OperationTypeNoB2G {
  B2B = OperationType.B2B,
  B2C = OperationType.B2C,
  B2F = OperationType.B2F,
}

export default new Table<{
  0: ['_id', OperationType];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [1, 'B2B'],
    [2, 'B2C'],
    [3, 'B2G'],
    [4, 'B2F'],
  ],
);
