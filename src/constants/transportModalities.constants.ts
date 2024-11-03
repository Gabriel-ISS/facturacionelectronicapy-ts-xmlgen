import { BasicData } from '../services/constants.service';

export enum TransportModality {
  TERRESTRE = 1,
  FLUVIAL = 2,
  AEREO = 3,
  MULTIMODAL = 4,
}

export const transportModalities: BasicData<TransportModality>[] = [
  {
    _id: TransportModality.TERRESTRE,
    description: 'Terrestre',
  },
  {
    _id: TransportModality.FLUVIAL,
    description: 'Fluvial',
  },
  {
    _id: TransportModality.AEREO,
    description: 'Aéreo',
  },
  {
    _id: TransportModality.MULTIMODAL,
    description: 'Multimodal',
  },
];
