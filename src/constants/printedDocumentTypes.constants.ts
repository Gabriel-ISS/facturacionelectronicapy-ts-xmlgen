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
    code: PrintedDocumentType.FACTURA,
    description: 'Factura',
  },
  {
    code: PrintedDocumentType.NOTA_DE_CREDITO,
    description: 'Nota de crédito',
  },
  {
    code: PrintedDocumentType.NOTA_DE_DEBITO,
    description: 'Nota de débito',
  },
  {
    code: PrintedDocumentType.NOTA_DE_REMISION,
    description: 'Nota de remisión',
  },
  {
    code: PrintedDocumentType.COMPROBANTE_DE_RETENCION,
    description: 'Comprobante de retención',
  },
];
