import { BasicData } from '../services/constants.service';
import { IdentityDocument, identityDocuments } from './identityDocuments.contants';

export enum IdentityDocumentReceptor {
  CEDULA_PARAGUAYA = IdentityDocument.CEDULA_PARAGUAYA,
  PASAPORTE = IdentityDocument.PASAPORTE,
  CEDULA_EXTRANJERA = IdentityDocument.CEDULA_EXTRANJERA,
  CARNET_DE_RESIDENCIA = IdentityDocument.CARNET_DE_RESIDENCIA,
  INNOMINADO = IdentityDocument.INNOMINADO,
  TARJETA_DIPLOMATICA_DE_EXONERACION_FISCAL = IdentityDocument.TARJETA_DIPLOMATICA_DE_EXONERACION_FISCAL,
  OTRO = IdentityDocument.OTRO,
}

export const identityDocumentsReceptors: BasicData<IdentityDocument | IdentityDocumentReceptor>[] =
  [
    identityDocuments.CEDULA_PARAGUAYA,
    identityDocuments.PASAPORTE,
    identityDocuments.CEDULA_EXTRANJERA,
    identityDocuments.CARNET_DE_RESIDENCIA,
    identityDocuments.INNOMINADO,
    identityDocuments.TARJETA_DIPLOMATICA_DE_EXONERACION_FISCAL,
    identityDocuments.OTRO,
  ]
