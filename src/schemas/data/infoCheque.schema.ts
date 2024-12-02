import { z } from 'zod';
import CommonValidators from '../../helpers/validation/CommonValidators';

/**E7.1.2.Campos que describen el pago o entrega inicial de la operación con cheque (E630-E639) */
export const InfoChequeSchema = z.object({
  // E631
  numeroCheque: CommonValidators.zeroPadToLength(8),

  // E632
  banco: z.string().min(4).max(20),
});

export type InfoCheque = z.infer<typeof InfoChequeSchema>;