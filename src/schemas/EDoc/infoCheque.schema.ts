import { z } from 'zod';

export const InfoChequeSchema = z.object({
  // E631
  numeroCheque: z
    .number()
    .transform((value) => value.toString().padStart(8, '0')),
  // E632
  banco: z.string().min(1, { message: 'El banco emisor es requerido' }),
});
export type InfoCheque = z.infer<typeof InfoChequeSchema>;