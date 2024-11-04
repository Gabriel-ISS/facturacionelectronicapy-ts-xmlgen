import { z } from 'zod';
import NumberLength from '../../helpers/validation/NumberLenght';

export const SectorEnergiaElectricaSchema = z.object({
  // E792
  numeroMedidor: z.string().min(1).max(50).optional(),

  // E793
  codigoActividad: z.number().optional().refine(value => {
    if (value == undefined) return true;
    if (value.toString().length != 2) return false;
  }, {
    message: 'El valor debe tener 2 dígitos',
  }),

  // E794
  codigoCategoria: z.string().length(3).optional(),

  // E795
  lecturaAnterior: z.number().optional().superRefine((value, ctx) => {
    if (value == undefined) return;
    new NumberLength(value, ctx).max(11).decimalsLength(2);
  }),

  // E796
  lecturaActual: z.number().optional().superRefine((value, ctx) => {
    if (value == undefined) return;
    new NumberLength(value, ctx).max(11).decimalsLength(2);
  }),
});

export type SectorEnergiaElectrica = z.infer<
  typeof SectorEnergiaElectricaSchema
>;