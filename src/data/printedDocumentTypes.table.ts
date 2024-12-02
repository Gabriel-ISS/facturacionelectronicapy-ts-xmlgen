import Table from '../helpers/Table';

export enum PrintedDocumentType {
  FACTURA = 1,
  NOTA_DE_CREDITO = 2,
  NOTA_DE_DEBITO = 3,
  NOTA_DE_REMISION = 4,
}

export default new Table<{
  0: ['_id', PrintedDocumentType];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [1, 'Factura'],
    [2, 'Nota de crédito'],
    [3, 'Nota de débito'],
    [4, 'Nota de remisión'],
  ],
);
