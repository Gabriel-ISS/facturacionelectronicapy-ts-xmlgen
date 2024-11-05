import { z } from 'zod';
import CommonValidators from '../../helpers/validation/CommonValidators';

export const ChoferSchema = z.object({
  // E990
  documentoNumero: CommonValidators.identityDocNumber(),

  // E991
  nombre: CommonValidators.name(),

  // E993
  direccion: CommonValidators.address().optional(),
});

export type Chofer = z.infer<typeof ChoferSchema>;