import { BasicData } from '../services/constants.service';

export enum AssociatedDocumentType {
  ELECTRONICO = 1,
  IMPRESO = 2,
  CONSTANCIA_ELECTRONICA = 3,
}

export const associatedDocumentTypes: BasicData<AssociatedDocumentType>[] = [
  {
    code: AssociatedDocumentType.ELECTRONICO,
    description: 'Electrónico',
  },
  {
    code: AssociatedDocumentType.IMPRESO,
    description: 'Impreso',
  },
  {
    code: AssociatedDocumentType.CONSTANCIA_ELECTRONICA,
    description: 'Constancia Electrónica',
  },
];
