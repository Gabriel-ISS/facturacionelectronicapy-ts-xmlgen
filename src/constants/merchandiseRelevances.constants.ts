import { BasicData } from '../services/constants.service';

export enum MerchandiseRelevance {
  TOLERANCIA_DE_QUIEBRA = 1,
  TOLERANCIA_DE_MERMA = 2,
}

export const merchandiseRelevances: BasicData<MerchandiseRelevance>[] = [
  {
    code: MerchandiseRelevance.TOLERANCIA_DE_QUIEBRA,
    description: 'Tolerancia de quiebra',
  },
  {
    code: MerchandiseRelevance.TOLERANCIA_DE_MERMA,
    description: 'Tolerancia de merma',
  },
];
