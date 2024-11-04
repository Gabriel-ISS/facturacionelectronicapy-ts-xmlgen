import { z } from 'zod';
import { Obligation } from '../../constants/obligations.constants';
import { enumToZodUnion } from '../../helpers/validation/enumConverter';

export const ObligacionSchema = z.object({
  // D031
  codigo: z.union(enumToZodUnion(Obligation)),
  // D032
  descripcion: z.string().optional(),
});
export type Obligacion = z.infer<typeof ObligacionSchema>;