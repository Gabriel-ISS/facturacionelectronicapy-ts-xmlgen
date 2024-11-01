import { BasicData } from '../services/constants.service';

export enum OperationType {
  B2B = 1,
  B2C = 2,
  B2G = 3,
  B2F = 4,
}

export const operationTypes: BasicData<OperationType>[] = [
  {
    id: OperationType.B2B,
    description: 'B2B',
  },
  {
    id: OperationType.B2C,
    description: 'B2C',
  },
  {
    id: OperationType.B2G,
    description: 'B2G',
  },
  {
    id: OperationType.B2F,
    description: 'B2F',
  },
];
