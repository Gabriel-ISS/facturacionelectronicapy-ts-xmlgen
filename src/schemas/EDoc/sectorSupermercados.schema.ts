import { z } from 'zod';
import NumberLength from '../../helpers/validation/NumberLenght';

export const SectorSupermercadosSchema = z.object({
  // E811
  nombreCajero: z.string().min(1).max(20).optional(),

  // E812
  efectivo: z.number().optional().superRefine((value, ctx) => {
    if (value == undefined) return;
    new NumberLength(value, ctx).max(15).maxDecimals(4);
  }),

  // E813
  vuelto: z.number().optional().superRefine((value, ctx) => {
    if (value == undefined) return;
    new NumberLength(value, ctx).max(6).maxDecimals(4);
  }),

  // E814
  donacion: z.number().optional().superRefine((value, ctx) => {
    if (value == undefined) return;
    new NumberLength(value, ctx).max(6).maxDecimals(4);
  }),

  // E815
  donacionDescripcion: z.string().min(1).max(20).optional(),
});

export type SectorSupermercados = z.infer<typeof SectorSupermercadosSchema>;