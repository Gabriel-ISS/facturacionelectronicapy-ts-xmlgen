import { BasicData } from '../services/constants.service';

export enum TransportModality {
  TERRESTRE = 1,
  FLUVIAL = 2,
  AEREO = 3,
  MULTIMODAL = 4,
}

export const transportModalities: BasicData<TransportModality>[] = [
  {
    code: TransportModality.TERRESTRE,
    description: 'Terrestre',
  },
  {
    code: TransportModality.FLUVIAL,
    description: 'Fluvial',
  },
  {
    code: TransportModality.AEREO,
    description: 'Aéreo',
  },
  {
    code: TransportModality.MULTIMODAL,
    description: 'Multimodal',
  },
];
