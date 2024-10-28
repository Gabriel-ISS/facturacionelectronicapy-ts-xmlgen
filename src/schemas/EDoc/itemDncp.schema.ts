import { z } from 'zod';

export const ItemDncpSchema = z.object({
  // E704
  codigoNivelGeneral: z.string().optional(),

  // E705
  codigoNivelEspecifico: z.string().optional(),

  // E706
  codigoGtinProducto: z.string().optional(),

  // E707
  codigoNivelPaquete: z.string().optional(),
});
export type ItemDncp = z.infer<typeof ItemDncpSchema>;