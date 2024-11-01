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
    id: IdentityDocument.CEDULA_PARAGUAYA,
    description: 'Cédula paraguaya',
  },
  PASAPORTE: {
    id: IdentityDocument.PASAPORTE,
    description: 'Pasaporte',
  },
  CEDULA_EXTRANJERA: {
    id: IdentityDocument.CEDULA_EXTRANJERA,
    description: 'Cédula extranjera',
  },
  CARNET_DE_RESIDENCIA: {
    id: IdentityDocument.CARNET_DE_RESIDENCIA,
    description: 'Carnet de residencia',
  },
  INNOMINADO: {
    id: IdentityDocument.INNOMINADO,
    description: 'Innominado',
  },
  TARJETA_DIPLOMATICA_DE_EXONERACION_FISCAL: {
    id: IdentityDocument.TARJETA_DIPLOMATICA_DE_EXONERACION_FISCAL,
    description: 'Tarjeta Diplomática de exoneración fiscal',
  },
  OTRO: {
    id: IdentityDocument.OTRO,
    description: 'Otro',
  },
} as const satisfies Record<string, BasicData<IdentityDocument>>;
