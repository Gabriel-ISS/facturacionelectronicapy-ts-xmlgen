import Table from '../helpers/Table';

export enum TransactionType {
  VENTA_DE_MERCADERIA = 1,
  PRESTACION_DE_SERVICIOS = 2,
  MIXTO__VENTA_DE_MERCADERIA_Y_SERVICIOS_ = 3,
  VENTA_DE_ACTIVO_FIJO = 4,
  VENTA_DE_DIVISAS = 5,
  COMPRA_DE_DIVISAS = 6,
  PROMOCION_O_ENTREGA_DE_MUESTRAS = 7,
  DONACION = 8,
  ANTICIPO = 9,
  COMPRA_DE_PRODUCTOS = 10,
  COMPRA_DE_SERVICIOS = 11,
  VENTA_DE_CREDITO_FISCAL = 12,
  MUESTRAS_MEDICAS__ART__3_RG_24_2014_ = 13,
}

export default new Table<{
  0: ['_id', TransactionType];
  1: ['description', string];
  2: ['state', number];
}>(
  ['_id', 'description', 'state'],
  [
    [1, 'Venta de mercadería', 0],
    [2, 'Prestación de servicios', 1],
    [3, 'Mixto (Venta de mercadería y servicios)', 1],
    [4, 'Venta de activo fijo', 0],
    [5, 'Venta de divisas', 0],
    [6, 'Compra de divisas', 0],
    [7, 'Promoción o entrega de muestras', 0],
    [8, 'Donación', 1],
    [9, 'Anticipo', 1],
    [10, 'Compra de productos', 1],
    [11, 'Compra de servicios', 1],
    [12, 'Venta de crédito fiscal', 1],
    [13, 'Muestras médicas (Art. 3 RG 24/2014)', 1],
  ],
);
