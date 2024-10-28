import { z } from 'zod';

export const InfoCuotaSchema = z.object({
  moneda: z.string(),
  monto: z.number(),
  vencimiento: z.string(),
});
export type InfoCuota = z.infer<typeof InfoCuotaSchema>;