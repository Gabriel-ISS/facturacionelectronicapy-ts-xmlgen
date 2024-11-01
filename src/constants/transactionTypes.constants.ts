import { DataWithState } from '../services/constants.service';

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

export const transactionTypes: DataWithState<TransactionType>[] = [
  {
    id: TransactionType.VENTA_DE_MERCADERIA,
    description: 'Venta de mercadería',
    state: 0,
  },
  {
    id: TransactionType.PRESTACION_DE_SERVICIOS,
    description: 'Prestación de servicios',
    state: 1,
  },
  {
    id: TransactionType.MIXTO__VENTA_DE_MERCADERIA_Y_SERVICIOS_,
    description: 'Mixto (Venta de mercadería y servicios)',
    state: 1,
  },
  {
    id: TransactionType.VENTA_DE_ACTIVO_FIJO,
    description: 'Venta de activo fijo',
    state: 0,
  },
  {
    id: TransactionType.VENTA_DE_DIVISAS,
    description: 'Venta de divisas',
    state: 0,
  },
  {
    id: TransactionType.COMPRA_DE_DIVISAS,
    description: 'Compra de divisas',
    state: 0,
  },
  {
    id: TransactionType.PROMOCION_O_ENTREGA_DE_MUESTRAS,
    description: 'Promoción o entrega de muestras',
    state: 0,
  },
  {
    id: TransactionType.DONACION,
    description: 'Donación',
    state: 1,
  },
  {
    id: TransactionType.ANTICIPO,
    description: 'Anticipo',
    state: 1,
  },
  {
    id: TransactionType.COMPRA_DE_PRODUCTOS,
    description: 'Compra de productos',
    state: 1,
  },
  {
    id: TransactionType.COMPRA_DE_SERVICIOS,
    description: 'Compra de servicios',
    state: 1,
  },
  {
    id: TransactionType.VENTA_DE_CREDITO_FISCAL,
    description: 'Venta de crédito fiscal',
    state: 1,
  },
  {
    id: TransactionType.MUESTRAS_MEDICAS__ART__3_RG_24_2014_,
    description: 'Muestras médicas (Art. 3 RG 24/2014)',
    state: 1,
  },
];
