import { BasicData } from '../services/constants.service';

export enum AssociatedDocumentType {
  ELECTRONICO = 1,
  IMPRESO = 2,
  CONSTANCIA_ELECTRONICA = 3,
}

export const associatedDocumentTypes: BasicData<AssociatedDocumentType>[] = [
  {
    id: AssociatedDocumentType.ELECTRONICO,
    description: 'Electrónico',
  },
  {
    id: AssociatedDocumentType.IMPRESO,
    description: 'Impreso',
  },
  {
    id: AssociatedDocumentType.CONSTANCIA_ELECTRONICA,
    description: 'Constancia Electrónica',
  },
];
