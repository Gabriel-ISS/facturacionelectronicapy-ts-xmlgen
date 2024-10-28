import { z } from 'zod';

export const SectorEnergiaElectricaSchema = z.object({
   // E792
   numeroMedidor: z.string().optional(),

   // E793
   codigoActividad: z.number().optional(),
 
   // E794
   codigoCategoria: z.string().optional(),
 
   // E795
   lecturaAnterior: z.number().optional(),
 
   // E796
   lecturaActual: z.number().optional(),
});

export type SectorEnergiaElectrica = z.infer<
  typeof SectorEnergiaElectricaSchema
>;