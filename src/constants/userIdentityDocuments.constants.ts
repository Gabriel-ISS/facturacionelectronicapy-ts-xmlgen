import { BasicData } from '../services/constants.service';
import { IdentityDocument, identityDocuments } from './identityDocuments.contants';

export enum UserIdentityDocument {
  CEDULA_PARAGUAYA = IdentityDocument.CEDULA_PARAGUAYA,
  PASAPORTE = IdentityDocument.PASAPORTE,
  CEDULA_EXTRANJERA = IdentityDocument.CEDULA_EXTRANJERA,
  CARNET_DE_RESIDENCIA = IdentityDocument.CARNET_DE_RESIDENCIA,
  OTRO = IdentityDocument.OTRO,
}

export const userIdentityDocuments: BasicData<IdentityDocument | UserIdentityDocument>[] = [
  identityDocuments.CEDULA_PARAGUAYA,
  identityDocuments.PASAPORTE,
  identityDocuments.CEDULA_EXTRANJERA,
  identityDocuments.CARNET_DE_RESIDENCIA,
  identityDocuments.OTRO,
];
