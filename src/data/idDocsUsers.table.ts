import { IdentityDocument, idDocs } from './shared/idDoc.table';
import Table from '../helpers/Table';

export enum IdentityDocumentUser {
  CEDULA_PARAGUAYA = IdentityDocument.CEDULA_PARAGUAYA,
  PASAPORTE = IdentityDocument.PASAPORTE,
  CEDULA_EXTRANJERA = IdentityDocument.CEDULA_EXTRANJERA,
  CARNET_DE_RESIDENCIA = IdentityDocument.CARNET_DE_RESIDENCIA,
  OTRO = IdentityDocument.OTRO,
}

export default new Table<{
  0: ['_id', IdentityDocumentUser];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    idDocs.CEDULA_PARAGUAYA,
    idDocs.PASAPORTE,
    idDocs.CEDULA_EXTRANJERA,
    idDocs.CARNET_DE_RESIDENCIA,
    idDocs.OTRO,
  ],
);
