import { z } from 'zod';
import { PaymentCondition } from '../../constants/paymentCondition.constants';
import { enumToZodUnion } from '../../helpers/validation/enumConverter';
import { EntregasSchema } from './entregas.schema';

export const CondicionSchema = z.object({
  // E601
  tipo: z.union(enumToZodUnion(PaymentCondition), {
    required_error: 'La condición de la operación es requerida',
  }),

  // E602
  entregas: z.array(EntregasSchema).optional(),

  // E603:TODO: CÓDIGO NO ENCONTRADO
  credito: z
    .string()
    .optional()
    .describe('Campos que describen la operación a crédito'),
});

export type Condicion = z.infer<typeof CondicionSchema>;