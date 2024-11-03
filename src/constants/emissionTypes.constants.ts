import { BasicData } from '../services/constants.service';

export enum EmissionType {
  NORMAL = 1,
  CONTINGENCIA = 2,
}

export const emissionTypes: BasicData<EmissionType>[] = [
  {
    _id: EmissionType.NORMAL,
    description: 'Normal',
  },
  {
    _id: EmissionType.CONTINGENCIA,
    description: 'Contingencia',
  },
];
