import { BasicData } from '../services/constants.service';

export enum TransportModality {
  TERRESTRE = 1,
  FLUVIAL = 2,
  AEREO = 3,
  MULTIMODAL = 4,
}

export const transportModalities: BasicData<TransportModality>[] = [
  {
    id: TransportModality.TERRESTRE,
    description: 'Terrestre',
  },
  {
    id: TransportModality.FLUVIAL,
    description: 'Fluvial',
  },
  {
    id: TransportModality.AEREO,
    description: 'Aéreo',
  },
  {
    id: TransportModality.MULTIMODAL,
    description: 'Multimodal',
  },
];
