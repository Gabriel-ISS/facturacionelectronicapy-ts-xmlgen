import { BasicData } from '../services/constants.service';

export enum IdentityDocument {
  CEDULA_PARAGUAYA = 1,
  PASAPORTE = 2,
  CEDULA_EXTRANJERA = 3,
  CARNET_DE_RESIDENCIA = 4,
  INNOMINADO = 5,
  TARJETA_DIPLOMATICA_DE_EXONERACION_FISCAL = 6,
  OTRO = 9,
}

export const identityDocuments = {
  CEDULA_PARAGUAYA: {
    _id: IdentityDocument.CEDULA_PARAGUAYA,
    description: 'Cédula paraguaya',
  },
  PASAPORTE: {
    _id: IdentityDocument.PASAPORTE,
    description: 'Pasaporte',
  },
  CEDULA_EXTRANJERA: {
    _id: IdentityDocument.CEDULA_EXTRANJERA,
    description: 'Cédula extranjera',
  },
  CARNET_DE_RESIDENCIA: {
    _id: IdentityDocument.CARNET_DE_RESIDENCIA,
    description: 'Carnet de residencia',
  },
  INNOMINADO: {
    _id: IdentityDocument.INNOMINADO,
    description: 'Innominado',
  },
  TARJETA_DIPLOMATICA_DE_EXONERACION_FISCAL: {
    _id: IdentityDocument.TARJETA_DIPLOMATICA_DE_EXONERACION_FISCAL,
    description: 'Tarjeta Diplomática de exoneración fiscal',
  },
  OTRO: {
    _id: IdentityDocument.OTRO,
    description: 'Otro',
  },
} as const satisfies Record<string, BasicData<IdentityDocument>>;
