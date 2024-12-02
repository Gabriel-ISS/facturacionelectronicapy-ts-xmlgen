import Table from '../helpers/Table';

export enum AssociatedDocumentType {
  ELECTRONICO = 1,
  IMPRESO = 2,
  CONSTANCIA_ELECTRONICA = 3,
}

export default new Table<{
  0: ['_id', AssociatedDocumentType];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [1, 'Electrónico'],
    [2, 'Impreso'],
    [3, 'Constancia Electrónica'],
  ],
);
