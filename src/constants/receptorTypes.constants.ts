import { BasicData } from '../services/constants.service';

export enum Receptor {
  CONTRIBUYENTE = 1,
  NO_CONTRIBUYENTE = 2,
}

export const receptorTypes: BasicData<Receptor>[] = [
  {
    code: Receptor.CONTRIBUYENTE,
    description: 'Contribuyente',
  },
  {
    code: Receptor.NO_CONTRIBUYENTE,
    description: 'No Contribuyente',
  },
];
