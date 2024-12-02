import Table from '../helpers/Table';
import { idDocs, IdentityDocument } from './shared/idDoc.table';

export enum IdentityDocForNominationEvent {
  CEDULA_PARAGUAYA = IdentityDocument.CEDULA_PARAGUAYA,
  PASAPORTE = IdentityDocument.PASAPORTE,
  CEDULA_EXTRANJERA = IdentityDocument.CEDULA_EXTRANJERA,
  CARNET_DE_RESIDENCIA = IdentityDocument.CARNET_DE_RESIDENCIA,
  // ⚠️ en otros documentos de identidad esto tiene el valor 6
  TARJETA_DIPLOMATICA_DE_EXONERACION_FISCAL = 5,
  OTRO = 9,
}

export default new Table<{
  0: ['_id', IdentityDocForNominationEvent];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    idDocs.CEDULA_PARAGUAYA,
    idDocs.PASAPORTE,
    idDocs.CEDULA_EXTRANJERA,
    idDocs.CARNET_DE_RESIDENCIA,
    [5, 'Tarjeta diplomática de exoneración fiscal'],
    idDocs.OTRO,
  ],
);
