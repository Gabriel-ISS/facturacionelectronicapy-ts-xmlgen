import { z } from 'zod';
import NumberLength from '../../helpers/validation/NumberLenght';
import SDParser from '../../helpers/SDParser';

/**E9.4. Sector de Supermercados (E810-E819) */
export const SectorSupermercadosSchema = z.object({
  // E811
  nombreCajero: z
    .string()
    .min(1)
    .max(20)
    .optional()
    .describe(SDParser.stringify('E811')),

  // E812
  efectivo: z
    .number()
    .optional()
    .superRefine((value, ctx) => {
      if (value == undefined) return;
      new NumberLength(value, ctx).max(15).maxDecimals(4);
    })
    .describe(SDParser.stringify('E812')),

  // E813
  vuelto: z
    .number()
    .optional()
    .superRefine((value, ctx) => {
      if (value == undefined) return;
      new NumberLength(value, ctx).max(6).maxDecimals(4);
    })
    .describe(SDParser.stringify('E813')),

  // E814
  donacion: z
    .number()
    .optional()
    .superRefine((value, ctx) => {
      if (value == undefined) return;
      new NumberLength(value, ctx).max(6).maxDecimals(4);
    })
    .describe(SDParser.stringify('E814')),

  // E815
  donacionDescripcion: z
    .string()
    .min(1)
    .max(20)
    .optional()
    .describe(SDParser.stringify('E815')),
});

export type SectorSupermercados = z.infer<typeof SectorSupermercadosSchema>;
