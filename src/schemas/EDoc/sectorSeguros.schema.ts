import { z } from 'zod';

export const SectorSegurosSchema = z.object({
  // E801
  codigoAseguradora: z.string().optional(),

  // EA791
  codigoPoliza: z.string(),

  // EA794
  numeroPoliza: z.string(),

  // EA792
  vigencia: z.string(),

  // EA793
  vigenciaUnidad: z.string(),

  // EA795
  inicioVigencia: z.string().optional(),

  // EA796
  finVigencia: z.string().optional(),

  // EA797
  codigoInternoItem: z.string().optional(),
});

export type SectorSeguros = z.infer<typeof SectorSegurosSchema>;