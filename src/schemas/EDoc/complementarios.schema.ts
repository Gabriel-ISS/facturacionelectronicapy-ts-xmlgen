import { z } from 'zod';
import { CargaSchema } from './carga.schema';

export const ComplementariosSchema = z.object({
  // G002
  ordenCompra: z.string().optional(),

  // G003
  ordenVenta: z.string().optional(),

  // G004
  numeroAsiento: z.string().optional(),

  carga: CargaSchema.optional(),
});
export type Complementarios = z.infer<typeof ComplementariosSchema>;