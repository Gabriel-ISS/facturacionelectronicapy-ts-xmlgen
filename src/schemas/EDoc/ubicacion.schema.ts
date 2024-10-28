import { z } from 'zod';

export const UbicacionSchema = z.object({
  // E316
  lugar: z.string({
    required_error: 'El lugar de la transacción es requerido',
  }),

  // E317
  departamento: z.string({
    required_error: 'El código del departamento es requerido',
  }),

  // E318
  departamentoDescripcion: z.string().optional(),

  // E319
  distrito: z.string({
    required_error: 'El código del distrito es requerido',
  }),

  // E320
  distritoDescripcion: z.string().optional(),

  // E321
  ciudad: z.string({
    required_error: 'El código de la ciudad es requerido',
  }),

  // E322
  ciudadDescripcion: z.string().optional(),
});
export type Ubicacion = z.infer<typeof UbicacionSchema>;