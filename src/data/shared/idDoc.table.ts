export enum IdentityDocument {
  CEDULA_PARAGUAYA = 1,
  PASAPORTE = 2,
  CEDULA_EXTRANJERA = 3,
  CARNET_DE_RESIDENCIA = 4,
  INNOMINADO = 5,
  TARJETA_DIPLOMATICA_DE_EXONERACION_FISCAL = 6,
  OTRO = 9,
}

/**documentos de identidad */
export const idDocs = {
  CEDULA_PARAGUAYA: [1, 'Cédula paraguaya'],
  PASAPORTE: [2, 'Pasaporte'],
  CEDULA_EXTRANJERA: [3, 'Cédula extranjera'],
  CARNET_DE_RESIDENCIA: [4, 'Carnet de residencia'],
  INNOMINADO: [5, 'Innominado'],
  TARJETA_DIPLOMATICA_DE_EXONERACION_FISCAL: [
    6,
    'Tarjeta Diplomática de exoneración fiscal',
  ],
  OTRO: [9, 'Otro'],
} as const satisfies Record<string, [IdentityDocument, string]>;
