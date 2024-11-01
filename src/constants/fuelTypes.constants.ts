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
    id: FuelType.GASOLINA,
    description: 'Gasolina',
  },
  {
    id: FuelType.DIESEL,
    description: 'Diésel',
  },
  {
    id: FuelType.ETANOL,
    description: 'Etanol',
  },
  {
    id: FuelType.GNV,
    description: 'GNV',
  },
  {
    id: FuelType.FLEX,
    description: 'Flex',
  },
  {
    id: FuelType.OTRO,
    description: 'Otro',
  },
];
