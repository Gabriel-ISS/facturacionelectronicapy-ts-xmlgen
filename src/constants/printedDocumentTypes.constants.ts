import { BasicData } from '../services/constants.service';

export enum PrintedDocumentType {
  FACTURA = 1,
  NOTA_DE_CREDITO = 2,
  NOTA_DE_DEBITO = 3,
  NOTA_DE_REMISION = 4,
  COMPROBANTE_DE_RETENCION = 5,
}

export const printedDocumentTypes: BasicData<PrintedDocumentType>[] = [
  {
    _id: PrintedDocumentType.FACTURA,
    description: 'Factura',
  },
  {
    _id: PrintedDocumentType.NOTA_DE_CREDITO,
    description: 'Nota de crédito',
  },
  {
    _id: PrintedDocumentType.NOTA_DE_DEBITO,
    description: 'Nota de débito',
  },
  {
    _id: PrintedDocumentType.NOTA_DE_REMISION,
    description: 'Nota de remisión',
  },
  {
    _id: PrintedDocumentType.COMPROBANTE_DE_RETENCION,
    description: 'Comprobante de retención',
  },
];
