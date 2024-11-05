import { z } from 'zod';
import NumberLength from '../../helpers/validation/NumberLenght';

/**E9.2. Sector Energía Eléctrica (E791-E799) */
export const SectorEnergiaElectricaSchema = z
  .object({
    // E792
    numeroMedidor: z.string().min(1).max(50).optional(),

    // E793
    codigoActividad: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).int().length(2);
      }),

    // E794
    codigoCategoria: z.string().length(3).optional(),

    // E795
    lecturaAnterior: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).max(11).decimalsLength(2);
      }),

    // E796
    lecturaActual: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).max(11).decimalsLength(2);
      }),
  })
  .transform((data, ctx) => {
    return {
      ...data,

      // E797
      // TODO: "Corresponde a la diferencia entre E785-E784" AVISAR A LA DNIT DEL ERROR
      consumo:
        data.lecturaActual && data.lecturaAnterior
          ? data.lecturaActual - data.lecturaAnterior
          : undefined,
    };
  });

export type SectorEnergiaElectrica = z.infer<
  typeof SectorEnergiaElectricaSchema
>;
