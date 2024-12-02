import Table from '../helpers/Table';

export enum CreditNoteReason {
  DEVOLUCION_Y_AJUSTE_DE_PRECIOS = 1,
  DEVOLUCION = 2,
  DESCUENTO = 3,
  BONIFICACION = 4,
  CREDITO_INCOBRABLE = 5,
  RECUPERO_DE_COSTO = 6,
  RECUPERO_DE_GASTO = 7,
  AJUSTE_DE_PRECIO = 8,
}

export default new Table<{
  0: ['_id', CreditNoteReason];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [1, 'Devolución y Ajuste de precios'],
    [2, 'Devolución'],
    [3, 'Descuento'],
    [4, 'Bonificación'],
    [5, 'Crédito incobrable'],
    [6, 'Recupero de costo'],
    [7, 'Recupero de gasto'],
    [8, 'Ajuste de precio'],
  ],
);
