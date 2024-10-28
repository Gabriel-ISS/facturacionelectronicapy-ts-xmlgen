import { z } from 'zod';
import { InfoCuotaSchema } from './infoCuota.schema';

export const CreditoSchema = z.object({
  tipo: z.number(),
  plazo: z.string(),
  cuotas: z.number(),
  infoCuotas: z.array(InfoCuotaSchema),
});
export type Credito = z.infer<typeof CreditoSchema>;