import { z } from 'zod';
import { GlobalAndPerItem } from '../../constants/globalAndPerItem.constants';
import { enumToZodUnion } from '../../helpers/zod.helpers';
import { EntregasSchema } from './entregas.schema';

export const CondicionSchema = z.object({
  // E601
  tipo: z.union(enumToZodUnion(GlobalAndPerItem), {
    required_error: 'La condición de la operación es requerida',
  }),

  // E602
  entregas: z.array(EntregasSchema).optional(),

  // E603
  credito: z
    .string()
    .optional()
    .describe('Campos que describen la operación a crédito'),
});
export type Condicion = z.infer<typeof CondicionSchema>;