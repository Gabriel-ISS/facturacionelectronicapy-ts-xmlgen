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
    id: PrintedDocumentType.FACTURA,
    description: 'Factura',
  },
  {
    id: PrintedDocumentType.NOTA_DE_CREDITO,
    description: 'Nota de crédito',
  },
  {
    id: PrintedDocumentType.NOTA_DE_DEBITO,
    description: 'Nota de débito',
  },
  {
    id: PrintedDocumentType.NOTA_DE_REMISION,
    description: 'Nota de remisión',
  },
  {
    id: PrintedDocumentType.COMPROBANTE_DE_RETENCION,
    description: 'Comprobante de retención',
  },
];
