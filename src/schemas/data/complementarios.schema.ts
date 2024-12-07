import { z } from 'zod';
import { CargaSchema } from './carga.schema';
import SDParser from '../../helpers/SDParser';

/**G. Campos complementarios comerciales de uso general (G001-G049) */
export const ComplementariosSchema = z.object({
  // G002
  ordenCompra: z
    .string()
    .min(1)
    .max(15)
    .optional()
    .describe(SDParser.stringify('G002')),

  // G003
  ordenVenta: z
    .string()
    .min(1)
    .max(15)
    .optional()
    .describe(SDParser.stringify('G003')),

  // G004
  numeroAsiento: z
    .string()
    .min(1)
    .max(10)
    .optional()
    .describe(SDParser.stringify('G004')),

  // G1. Campos generales de la carga (G050 - G099)
  carga: CargaSchema.optional().describe(
    SDParser.stringify('G1', {
      d: 'Campos generales de la carga (G050 - G099)',
    }),
  ),
});

export type Complementarios = z.infer<typeof ComplementariosSchema>;
