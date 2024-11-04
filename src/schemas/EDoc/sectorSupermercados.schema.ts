import { z } from 'zod';
import { validateNumberLength } from '../../helpers/zod.helpers';

export const SectorSupermercadosSchema = z.object({
  // E811
  nombreCajero: z.string().min(1).max(20).optional(),

  // E812
  efectivo: z.number().optional().superRefine((value, ctx) => {
    if (value == undefined) return;
    validateNumberLength({
      value,
      maxDecimals: 4,
      max: 15,
      ctx,
    })
  }),

  // E813
  vuelto: z.number().optional().superRefine((value, ctx) => {
    if (value == undefined) return;
    validateNumberLength({
      value,
      maxDecimals: 4,
      max: 6,
      ctx,
    })
  }),

  // E814
  donacion: z.number().optional().superRefine((value, ctx) => {
    if (value == undefined) return;
    validateNumberLength({
      value,
      maxDecimals: 4,
      max: 6,
      ctx,
    })
  }),

  // E815
  donacionDescripcion: z.string().min(1).max(20).optional(),
});

export type SectorSupermercados = z.infer<typeof SectorSupermercadosSchema>;