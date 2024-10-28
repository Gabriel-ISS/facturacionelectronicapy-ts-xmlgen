import { BasicData } from '../services/constants.service';

export enum ConstancyType {
  CONSTANCIA_DE_NO_SER_CONTRIBUYENTE = 1,
  CONSTANCIA_DE_MICROPRODUCTORES = 2,
}

export const constancyTypes: BasicData<ConstancyType>[] = [
  {
    code: ConstancyType.CONSTANCIA_DE_NO_SER_CONTRIBUYENTE,
    description: 'Constancia de no ser contribuyente',
  },
  {
    code: ConstancyType.CONSTANCIA_DE_MICROPRODUCTORES,
    description: 'Constancia de microproductores',
  },
];
