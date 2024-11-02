import { z } from 'zod';
import { CargaSchema } from './carga.schema';

export const ComplementariosSchema = z.object({
  // G002
  ordenCompra: z.string().min(1).max(15).optional(),

  // G003
  ordenVenta: z.string().min(1).max(15).optional(),

  // G004
  numeroAsiento: z.string().min(1).max(10).optional(),

  carga: CargaSchema.optional(),
});

export type Complementarios = z.infer<typeof ComplementariosSchema>;