import { BasicData } from '../services/constants.service';

export enum OperatingCondition {
  CONTADO = 1,
  CREDITO = 2,
}

export const operatingConditions: BasicData<OperatingCondition>[] = [
  {
    code: OperatingCondition.CONTADO,
    description: 'Contado',
  },
  {
    code: OperatingCondition.CREDITO,
    description: 'Crédito',
  },
];
