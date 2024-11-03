import { BasicData } from '../services/constants.service';

export enum FuelType {
  GASOLINA = 1,
  DIESEL = 2,
  ETANOL = 3,
  GNV = 4,
  FLEX = 5,
  OTRO = 9,
}

export const fuelTypes: BasicData<FuelType>[] = [
  {
    _id: FuelType.GASOLINA,
    description: 'Gasolina',
  },
  {
    _id: FuelType.DIESEL,
    description: 'Diésel',
  },
  {
    _id: FuelType.ETANOL,
    description: 'Etanol',
  },
  {
    _id: FuelType.GNV,
    description: 'GNV',
  },
  {
    _id: FuelType.FLEX,
    description: 'Flex',
  },
  {
    _id: FuelType.OTRO,
    description: 'Otro',
  },
];
