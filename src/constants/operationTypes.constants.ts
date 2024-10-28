import { BasicData } from '../services/constants.service';

export enum OperationType {
  B2B = 1,
  B2C = 2,
  B2G = 3,
  B2F = 4,
}

export const operationTypes: BasicData<OperationType>[] = [
  {
    code: OperationType.B2B,
    description: 'B2B',
  },
  {
    code: OperationType.B2C,
    description: 'B2C',
  },
  {
    code: OperationType.B2G,
    description: 'B2G',
  },
  {
    code: OperationType.B2F,
    description: 'B2F',
  },
];
