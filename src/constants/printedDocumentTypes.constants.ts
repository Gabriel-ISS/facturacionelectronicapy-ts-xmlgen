import { BasicData } from '../services/constants.service';

// VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_010_MT_V150.pdf/d64a693b-6c63-86e1-ec6a-d4fe5ec4eeea?t=1687353747196
export enum PrintedDocumentType {
  FACTURA = 1,
  NOTA_DE_CREDITO = 2,
  NOTA_DE_DEBITO = 3,
  NOTA_DE_REMISION = 4,
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
];
