import { BasicData } from '../services/constants.service';

export enum EmissionType {
  NORMAL = 1,
  CONTINGENCIA = 2,
}

export const emissionTypes: BasicData<EmissionType>[] = [
  {
    id: EmissionType.NORMAL,
    description: 'Normal',
  },
  {
    id: EmissionType.CONTINGENCIA,
    description: 'Contingencia',
  },
];
