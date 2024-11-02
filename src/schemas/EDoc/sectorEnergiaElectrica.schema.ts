import { z } from 'zod';
import { validateNumberLength } from '../../helpers/zod.helpers';

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
  lecturaAnterior: z.number().optional().superRefine((data, ctx) => {
    if (data == undefined) return;
    validateNumberLength({
      value: data,
      fieldName: 'lecturaAnterior',
      decimalsLength: 2, // numero exacto de decimales
      max: 11,
      ctx,
    })
  }),

  // E796
  lecturaActual: z.number().optional().superRefine((data, ctx) => {
    if (data == undefined) return;
    validateNumberLength({
      value: data,
      fieldName: 'lecturaActual',
      decimalsLength: 2,
      max: 11,
      ctx,
    })
  }),
});

export type SectorEnergiaElectrica = z.infer<
  typeof SectorEnergiaElectricaSchema
>;