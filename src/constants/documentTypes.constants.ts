import { DataWithState } from '../services/constants.service';
import { State } from './state.constants';

export enum ValidDocumentType {
  FACTURA_ELECTRONICA = 1,
  // Facturas de exportación
  // Facturas de importación
  AUTOFACTURA_ELECTRONICA = 4,
  NOTA_DE_CREDITO_ELECTRONICA = 5,
  NOTA_DE_DEBITO_ELECTRONICA = 6,
  NOTA_DE_REMISION_ELECTRONICA = 7,
  // Comprobantes de retención
}

export enum FutureDocumentType {
  FACTURA_ELECTRONICA_DE_EXPORTACION = 2,
  FACTURA_ELECTRONICA_DE_IMPORTACION = 3,
  COMPROBANTE_DE_RETENCION_ELECTRONICO = 8,
}

export const documentTypes: DataWithState<
  FutureDocumentType | ValidDocumentType
>[] = [
  {
    _id: ValidDocumentType.FACTURA_ELECTRONICA,
    description: 'Factura electrónica',
    state: State.NORMAL,
  },
  {
    _id: FutureDocumentType.FACTURA_ELECTRONICA_DE_EXPORTACION,
    description: 'Factura electrónica de exportación',
    state: State.A_FUTURO,
  },
  {
    _id: FutureDocumentType.FACTURA_ELECTRONICA_DE_IMPORTACION,
    description: 'Factura electrónica de importación',
    state: State.A_FUTURO,
  },
  {
    _id: ValidDocumentType.AUTOFACTURA_ELECTRONICA,
    description: 'Autofactura electrónica',
    state: State.NORMAL,
  },
  {
    _id: ValidDocumentType.NOTA_DE_CREDITO_ELECTRONICA,
    description: 'Nota de crédito electrónica',
    state: State.NORMAL,
  },
  {
    _id: ValidDocumentType.NOTA_DE_DEBITO_ELECTRONICA,
    description: 'Nota de débito electrónica',
    state: State.NORMAL,
  },
  {
    _id: ValidDocumentType.NOTA_DE_REMISION_ELECTRONICA,
    description: 'Nota de remisión electrónica',
    state: State.NORMAL,
  },
  {
    _id: FutureDocumentType.COMPROBANTE_DE_RETENCION_ELECTRONICO,
    description: 'Comprobante de retención electrónico',
    state: State.A_FUTURO,
  },
];
