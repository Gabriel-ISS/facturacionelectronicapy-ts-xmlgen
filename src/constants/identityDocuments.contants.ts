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
    code: IdentityDocument.CEDULA_PARAGUAYA,
    description: 'Cédula paraguaya',
  },
  PASAPORTE: {
    code: IdentityDocument.PASAPORTE,
    description: 'Pasaporte',
  },
  CEDULA_EXTRANJERA: {
    code: IdentityDocument.CEDULA_EXTRANJERA,
    description: 'Cédula extranjera',
  },
  CARNET_DE_RESIDENCIA: {
    code: IdentityDocument.CARNET_DE_RESIDENCIA,
    description: 'Carnet de residencia',
  },
  INNOMINADO: {
    code: IdentityDocument.INNOMINADO,
    description: 'Innominado',
  },
  TARJETA_DIPLOMATICA_DE_EXONERACION_FISCAL: {
    code: IdentityDocument.TARJETA_DIPLOMATICA_DE_EXONERACION_FISCAL,
    description: 'Tarjeta Diplomática de exoneración fiscal',
  },
  OTRO: {
    code: IdentityDocument.OTRO,
    description: 'Otro',
  },
} as const satisfies Record<string, BasicData<IdentityDocument>>;
