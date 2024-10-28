import { BasicData } from '../services/constants.service';

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

export const creditNoteReasons: BasicData<CreditNoteReason>[] = [
  {
    code: CreditNoteReason.DEVOLUCION_Y_AJUSTE_DE_PRECIOS,
    description: 'Devolución y Ajuste de precios',
  },
  {
    code: CreditNoteReason.DEVOLUCION,
    description: 'Devolución',
  },
  {
    code: CreditNoteReason.DESCUENTO,
    description: 'Descuento',
  },
  {
    code: CreditNoteReason.BONIFICACION,
    description: 'Bonificación',
  },
  {
    code: CreditNoteReason.CREDITO_INCOBRABLE,
    description: 'Crédito incobrable',
  },
  {
    code: CreditNoteReason.RECUPERO_DE_COSTO,
    description: 'Recupero de costo',
  },
  {
    code: CreditNoteReason.RECUPERO_DE_GASTO,
    description: 'Recupero de gasto',
  },
  {
    code: CreditNoteReason.AJUSTE_DE_PRECIO,
    description: 'Ajuste de precio',
  },
];
