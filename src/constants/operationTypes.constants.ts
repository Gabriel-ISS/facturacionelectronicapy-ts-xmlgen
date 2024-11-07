import { BasicData } from '../services/constants.service';

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

export const operationTypes: BasicData<OperationType>[] = [
  {
    _id: OperationType.B2B,
    description: 'B2B',
  },
  {
    _id: OperationType.B2C,
    description: 'B2C',
  },
  {
    _id: OperationType.B2G,
    description: 'B2G',
  },
  {
    _id: OperationType.B2F,
    description: 'B2F',
  },
];
