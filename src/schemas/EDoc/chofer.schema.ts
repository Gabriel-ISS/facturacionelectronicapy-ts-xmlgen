import { z } from 'zod';

export const ChoferSchema = z.object({
  // E990
  documentoNumero: z.string().min(1).max(20),

  // E991
  nombre: z.string().min(4).max(60),

  // E993
  direccion: z.string().min(1).max(255).optional(),
});

export type Chofer = z.infer<typeof ChoferSchema>;