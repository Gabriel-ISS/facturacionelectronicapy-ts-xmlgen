import { BasicData } from '../services/constants.service';

export enum IdentityDocForNominationEvent {
  CEDULA_PARAGUAYA = 1,
  PASAPORTE = 2,
  CEDULA_EXTRANJERA = 3,
  CARNET_DE_RESIDENCIA = 4,
  TARJETA_DIPLOMATICA_DE_EXONERACION_FISCAL = 5,
  OTRO = 9,
}

export const identityDocsForNominationEvent: BasicData<IdentityDocForNominationEvent>[] = [
  {
    _id: 1,
    description: 'Cédula paraguaya',
  },
  {
    _id: 2,
    description: 'Pasaporte',
  },
  {
    _id: 3,
    description: 'Cédula extranjera',
  },
  {
    _id: 4,
    description: 'Carnet de residencia',
  },
  {
    _id: 5,
    description: 'Tarjeta diplomática de exoneración fiscal',
  },
  {
    _id: 9,
    description: 'Otro',
  }
]