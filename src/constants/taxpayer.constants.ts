import { BasicData } from '../services/constants.service';

export enum Taxpayer {
  PERSONA_FISICA = 1,
  PERSONA_JURIDICA = 2,
}

export const taxpayerTypes: BasicData<Taxpayer>[] = [
  { _id: Taxpayer.PERSONA_FISICA, description: 'Persona física' },
  { _id: Taxpayer.PERSONA_JURIDICA, description: 'Persona jurídica' }
]