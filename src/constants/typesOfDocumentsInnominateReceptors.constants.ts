import { BasicData } from '../services/constants.service';
import { IdentityDocument, identityDocuments } from './identityDocuments.contants';

export enum IdentityDocumentInnominateReceptor {
  CEDULA_PARAGUAYA = IdentityDocument.CEDULA_PARAGUAYA,
  PASAPORTE = IdentityDocument.PASAPORTE,
  CEDULA_EXTRANJERA = IdentityDocument.CEDULA_EXTRANJERA,
  CARNET_DE_RESIDENCIA = IdentityDocument.CARNET_DE_RESIDENCIA,
  TARJETA_DIPLOMATICA_DE_EXONERACION_FISCAL = IdentityDocument.TARJETA_DIPLOMATICA_DE_EXONERACION_FISCAL,
  OTRO = IdentityDocument.OTRO,
}

export const identityDocumentsInnominateReceptors: BasicData<IdentityDocument | IdentityDocumentInnominateReceptor>[] = [
  identityDocuments.CEDULA_PARAGUAYA,
  identityDocuments.PASAPORTE,
  identityDocuments.CEDULA_EXTRANJERA,
  identityDocuments.CARNET_DE_RESIDENCIA,
  identityDocuments.TARJETA_DIPLOMATICA_DE_EXONERACION_FISCAL,
  identityDocuments.OTRO,
];
