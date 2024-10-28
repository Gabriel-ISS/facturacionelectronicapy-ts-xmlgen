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
    code: FuelType.GASOLINA,
    description: 'Gasolina',
  },
  {
    code: FuelType.DIESEL,
    description: 'Diésel',
  },
  {
    code: FuelType.ETANOL,
    description: 'Etanol',
  },
  {
    code: FuelType.GNV,
    description: 'GNV',
  },
  {
    code: FuelType.FLEX,
    description: 'Flex',
  },
  {
    code: FuelType.OTRO,
    description: 'Otro',
  },
];
