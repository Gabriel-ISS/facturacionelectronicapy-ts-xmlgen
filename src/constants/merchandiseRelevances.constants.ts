import { BasicData } from '../services/constants.service';

export enum MerchandiseRelevance {
  TOLERANCIA_DE_QUIEBRA = 1,
  TOLERANCIA_DE_MERMA = 2,
}

export const merchandiseRelevances: BasicData<MerchandiseRelevance>[] = [
  {
    _id: MerchandiseRelevance.TOLERANCIA_DE_QUIEBRA,
    description: 'Tolerancia de quiebra',
  },
  {
    _id: MerchandiseRelevance.TOLERANCIA_DE_MERMA,
    description: 'Tolerancia de merma',
  },
];
