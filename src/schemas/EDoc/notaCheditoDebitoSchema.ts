import { z } from 'zod';
import { CreditNoteReason } from '../../constants/creditNoteReasons.constants';
import { enumToZodUnion } from '../../helpers/validation/Common';

export const NotaCreditoDebitoSchema = z.object({
  // E401
  motivo: z.union(enumToZodUnion(CreditNoteReason), {
    required_error: 'El motivo de la nota de crédito/débito es requerido',
  }),
});
export type NotaCreditoDebito = z.infer<typeof NotaCreditoDebitoSchema>;