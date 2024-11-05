import { z } from 'zod';
import CommonValidators from '../../helpers/validation/CommonValidators';

export const AgenteSchema = z.object({
  // E994
  nombre: CommonValidators.name().optional(),

  // E995
  ruc: CommonValidators.ruc().optional(),

  // E997
  direccion: CommonValidators.address().optional(),
}).transform((data, ctx) => {
  return {
    ...data,

    // E996: TODO: VERIFICAR SI EL RUC CONTIENE EL DIJITO
    digitoVerificadorRuc: data.ruc?.split('-')[1],
  }
})

export type Agente = z.infer<typeof AgenteSchema>;