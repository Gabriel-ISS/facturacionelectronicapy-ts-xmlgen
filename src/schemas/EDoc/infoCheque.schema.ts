import { z } from 'zod';
import CommonValidators from '../../helpers/validation/CommonValidators';

export const InfoChequeSchema = z.object({
  // E631
  numeroCheque: CommonValidators.zeroPadToLength(8),

  // E632
  banco: z.string({ required_error: 'El banco emisor es requerido' }).min(4).max(20),
});

export type InfoCheque = z.infer<typeof InfoChequeSchema>;