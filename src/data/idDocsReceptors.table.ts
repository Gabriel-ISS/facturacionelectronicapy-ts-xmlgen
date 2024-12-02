import { IdentityDocument, idDocs } from '../data/shared/idDoc.table';
import Table from '../helpers/Table';

export enum IdentityDocumentReceptor {
  CEDULA_PARAGUAYA = IdentityDocument.CEDULA_PARAGUAYA,
  PASAPORTE = IdentityDocument.PASAPORTE,
  CEDULA_EXTRANJERA = IdentityDocument.CEDULA_EXTRANJERA,
  CARNET_DE_RESIDENCIA = IdentityDocument.CARNET_DE_RESIDENCIA,
  INNOMINADO = IdentityDocument.INNOMINADO,
  TARJETA_DIPLOMATICA_DE_EXONERACION_FISCAL = IdentityDocument.TARJETA_DIPLOMATICA_DE_EXONERACION_FISCAL,
  OTRO = IdentityDocument.OTRO,
}

export default new Table<{
  0: ['_id', IdentityDocumentReceptor];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    idDocs.CEDULA_PARAGUAYA,
    idDocs.PASAPORTE,
    idDocs.CEDULA_EXTRANJERA,
    idDocs.CARNET_DE_RESIDENCIA,
    idDocs.INNOMINADO,
    idDocs.TARJETA_DIPLOMATICA_DE_EXONERACION_FISCAL,
    idDocs.OTRO,
  ],
);
