import { BasicData } from '../services/constants.service';

export enum EmissionType {
  NORMAL = 1,
  CONTINGENCIA = 2,
}

export const emissionTypes: BasicData<EmissionType>[] = [
  {
    code: EmissionType.NORMAL,
    description: 'Normal',
  },
  {
    code: EmissionType.CONTINGENCIA,
    description: 'Contingencia',
  },
];
