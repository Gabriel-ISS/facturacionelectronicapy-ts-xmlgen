import { BasicData } from '../services/constants.service';

export enum AssociatedDocumentType {
  ELECTRONICO = 1,
  IMPRESO = 2,
  CONSTANCIA_ELECTRONICA = 3,
}

export const associatedDocumentTypes: BasicData<AssociatedDocumentType>[] = [
  {
    _id: AssociatedDocumentType.ELECTRONICO,
    description: 'Electrónico',
  },
  {
    _id: AssociatedDocumentType.IMPRESO,
    description: 'Impreso',
  },
  {
    _id: AssociatedDocumentType.CONSTANCIA_ELECTRONICA,
    description: 'Constancia Electrónica',
  },
];
