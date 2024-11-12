import { z } from 'zod';
import CommonValidators from '../../helpers/validation/CommonValidators';

export const AgenteSchema = z.object({
  // E994
  nombre: CommonValidators.name().optional(),

  // para obtener E995 y E996
  ruc: CommonValidators.ruc().optional(),

  // E997
  direccion: CommonValidators.address().optional(),
}).transform((data, ctx) => {

  const [rucID, rucDV] = data.ruc?.split('-') ?? []

  return {
    ...data,

    // E995
    rucID,

    // E996
    rucDV,
  }
})

export type Agente = z.infer<typeof AgenteSchema>;