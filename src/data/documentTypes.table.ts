import Table from '../helpers/Table';

export enum AllDocumentTypes {
  FACTURA_ELECTRONICA = 1,
  FACTURA_ELECTRONICA_DE_EXPORTACION = 2,
  FACTURA_ELECTRONICA_DE_IMPORTACION = 3,
  AUTOFACTURA_ELECTRONICA = 4,
  NOTA_DE_CREDITO_ELECTRONICA = 5,
  NOTA_DE_DEBITO_ELECTRONICA = 6,
  NOTA_DE_REMISION_ELECTRONICA = 7,
  COMPROBANTE_DE_RETENCION_ELECTRONICO = 8,
}

export enum ValidDocumentType {
  FACTURA_ELECTRONICA = AllDocumentTypes.FACTURA_ELECTRONICA,
  // Facturas de exportación
  // Facturas de importación
  AUTOFACTURA_ELECTRONICA = AllDocumentTypes.AUTOFACTURA_ELECTRONICA,
  NOTA_DE_CREDITO_ELECTRONICA = AllDocumentTypes.NOTA_DE_CREDITO_ELECTRONICA,
  NOTA_DE_DEBITO_ELECTRONICA = AllDocumentTypes.NOTA_DE_DEBITO_ELECTRONICA,
  NOTA_DE_REMISION_ELECTRONICA = AllDocumentTypes.NOTA_DE_REMISION_ELECTRONICA,
  // Comprobantes de retención
}

export enum FutureDocumentType {
  FACTURA_ELECTRONICA_DE_EXPORTACION = AllDocumentTypes.FACTURA_ELECTRONICA_DE_EXPORTACION,
  FACTURA_ELECTRONICA_DE_IMPORTACION = AllDocumentTypes.FACTURA_ELECTRONICA_DE_IMPORTACION,
  COMPROBANTE_DE_RETENCION_ELECTRONICO = AllDocumentTypes.COMPROBANTE_DE_RETENCION_ELECTRONICO,
}

export default new Table<{
  0: ['_id', AllDocumentTypes];
  1: ['description', string];
  2: ['state', number];
}>(
  ['_id', 'description', 'state'],
  [
    [1, 'Factura electrónica', 0],
    [2, 'Factura electrónica de exportación', 1],
    [3, 'Factura electrónica de importación', 1],
    [4, 'Autofactura electrónica', 0],
    [5, 'Nota de crédito electrónica', 0],
    [6, 'Nota de débito electrónica', 0],
    [7, 'Nota de remisión electrónica', 0],
    [8, 'Comprobante de retención electrónico', 1],
  ],
);
