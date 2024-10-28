import { z } from 'zod';

export const SectorSupermercadosSchema = z.object({
  // E811
  nombreCajero: z.string().optional(),

  // E812
  efectivo: z.number().optional(),

  // E813
  vuelto: z.number().optional(),

  // E814
  donacion: z.number().optional(),

  // E815
  donacionDescripcion: z.string().optional(),
});

export type SectorSupermercados = z.infer<typeof SectorSupermercadosSchema>;