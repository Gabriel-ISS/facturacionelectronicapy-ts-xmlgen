import { z } from 'zod';
import NumberLength from '../../helpers/validation/NumberLenght';
import SDParser from '../../helpers/SDParser';

/**E9.2. Sector Energía Eléctrica (E791-E799) */
export const SectorEnergiaElectricaSchema = z
  .object({
    // E792
    numeroMedidor: z
      .string()
      .min(1)
      .max(50)
      .optional()
      .describe(SDParser.stringify('E792')),

    // E793
    codigoActividad: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).int().length(2);
      })
      .describe(SDParser.stringify('E793')),

    // E794
    codigoCategoria: z
      .string()
      .length(3)
      .optional()
      .describe(SDParser.stringify('E794')),

    // E795
    lecturaAnterior: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).max(11).decimalsLength(2);
      })
      .describe(SDParser.stringify('E795')),

    // E796
    lecturaActual: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).max(11).decimalsLength(2);
      })
      .describe(SDParser.stringify('E796')),
  })
  .transform((data, ctx) => {
    return {
      ...data,

      // E797
      consumo:
        data.lecturaActual && data.lecturaAnterior
          ? data.lecturaActual - data.lecturaAnterior
          : undefined,
    };
  });

export type SectorEnergiaElectrica = z.infer<
  typeof SectorEnergiaElectricaSchema
>;
