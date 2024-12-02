import { z } from 'zod';
import CommonValidators from '../../helpers/validation/CommonValidators';

export const ChoferSchema = z.object({
  // E990
  documentoNumero: CommonValidators.identityDocNumber(),

  // E991
  nombre: CommonValidators.name(),

  // E993
  // VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_010_MT_V150.pdf/d64a693b-6c63-86e1-ec6a-d4fe5ec4eeea?t=1687353747196
  direccion: CommonValidators.address(),
});

export type Chofer = z.infer<typeof ChoferSchema>;