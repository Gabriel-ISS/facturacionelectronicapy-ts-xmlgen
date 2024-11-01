import { BasicData } from '../services/constants.service';

export enum OperatingCondition {
  CONTADO = 1,
  CREDITO = 2,
}

export const operatingConditions: BasicData<OperatingCondition>[] = [
  {
    id: OperatingCondition.CONTADO,
    description: 'Contado',
  },
  {
    id: OperatingCondition.CREDITO,
    description: 'Crédito',
  },
];
