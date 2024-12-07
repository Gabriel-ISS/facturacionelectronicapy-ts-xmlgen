import { z } from 'zod';
import SDParser from '../../helpers/SDParser';

// VER: https://servicios.set.gov.py/eset-publico/consultarActividadEconomicaIService.do
/**D2.1 Campos que describen la actividad económica del emisor (D130-D139) */
export const ActividadEconomicaSchema = z.object({
  // D131
  codigo: z.string().min(1).max(8).describe(SDParser.stringify('D131')),

  // D132
  descripcion: z.string().min(1).max(300).describe(SDParser.stringify('D132')),
});

export type ActividadEconomica = z.infer<typeof ActividadEconomicaSchema>;
