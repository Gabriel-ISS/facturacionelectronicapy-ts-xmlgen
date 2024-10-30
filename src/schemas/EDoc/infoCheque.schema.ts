import { z } from 'zod';

export const InfoChequeSchema = z.object({
  // E631
  numeroCheque: z
    .number()
    .transform((value) => value.toString().padStart(8, '0')),

  // E632
  banco: z.string({ required_error: 'El banco emisor es requerido' }).min(4).max(20),
});

export type InfoCheque = z.infer<typeof InfoChequeSchema>;