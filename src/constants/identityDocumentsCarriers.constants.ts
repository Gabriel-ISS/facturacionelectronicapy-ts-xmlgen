import { BasicData } from '../services/constants.service';
import { IdentityDocument, identityDocuments } from './identityDocuments.contants';

// VER DONDE SE USA ANTES DE ACTUALIZAR
export enum IdentityDocumentCarriers {
  CEDULA_PARAGUAYA = IdentityDocument.CEDULA_PARAGUAYA,
  PASAPORTE = IdentityDocument.PASAPORTE,
  CEDULA_EXTRANJERA = IdentityDocument.CEDULA_EXTRANJERA,
  CARNET_DE_RESIDENCIA = IdentityDocument.CARNET_DE_RESIDENCIA,
}

export const identityDocumentsCarriers: BasicData<IdentityDocument | IdentityDocumentCarriers>[] = [
  identityDocuments.CEDULA_PARAGUAYA,
  identityDocuments.PASAPORTE,
  identityDocuments.CEDULA_EXTRANJERA,
  identityDocuments.CARNET_DE_RESIDENCIA,
];
