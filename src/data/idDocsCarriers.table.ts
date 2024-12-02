import { IdentityDocument, idDocs } from '../data/shared/idDoc.table';
import Table from '../helpers/Table';

export enum IdentityDocumentCarriers {
  CEDULA_PARAGUAYA = IdentityDocument.CEDULA_PARAGUAYA,
  PASAPORTE = IdentityDocument.PASAPORTE,
  CEDULA_EXTRANJERA = IdentityDocument.CEDULA_EXTRANJERA,
  CARNET_DE_RESIDENCIA = IdentityDocument.CARNET_DE_RESIDENCIA,
}

export default new Table<{
  0: ['_id', IdentityDocumentCarriers];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    idDocs.CEDULA_PARAGUAYA,
    idDocs.PASAPORTE,
    idDocs.CEDULA_EXTRANJERA,
    idDocs.CARNET_DE_RESIDENCIA,
  ],
);
