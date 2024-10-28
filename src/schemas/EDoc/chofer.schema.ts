import { z } from 'zod';

export const ChoferSchema = z.object({
  // E990
  documentoNumero: z.string(),

  // E991
  nombre: z.string(),

  // E993
  direccion: z.string(),
});

export type Chofer = z.infer<typeof ChoferSchema>;