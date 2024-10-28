import { z } from 'zod';

export const AgenteSchema = z.object({
  // E994
  nombre: z.string().optional().describe('Nombre o razón social del agente. Casos particulares según RG N°41/14'),

  // E995
  ruc: z.string().optional().describe('RUC del agente'),

  // E997
  direccion: z.string().optional().describe('Dirección del agente'),
});

export type Agente = z.infer<typeof AgenteSchema>;