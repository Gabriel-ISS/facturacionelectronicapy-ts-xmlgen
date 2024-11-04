import { z } from 'zod';

export const AgenteSchema = z.object({
  // E994
  nombre: z.string().min(4).max(60).optional(),

  // E995
  ruc: z.string().min(3).max(8).optional(),

  // E997
  direccion: z.string().min(1).max(255).optional(),
});

export type Agente = z.infer<typeof AgenteSchema>;