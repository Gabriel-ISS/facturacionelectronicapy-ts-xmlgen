import { BasicData } from '../services/constants.service';

export enum Receptor {
  CONTRIBUYENTE = 1,
  NO_CONTRIBUYENTE = 2,
}

export const receptorTypes: BasicData<Receptor>[] = [
  {
    id: Receptor.CONTRIBUYENTE,
    description: 'Contribuyente',
  },
  {
    id: Receptor.NO_CONTRIBUYENTE,
    description: 'No Contribuyente',
  },
];
