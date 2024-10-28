import { z } from 'zod';

export const SectorAutomotorSchema = z.object({
  tipo: z.number(),
  chasis: z.string(),
  color: z.string(),
  potencia: z.number(),
  capacidadMotor: z.number(),
  capacidadPasajeros: z.number(),
  pesoBruto: z.number(),
  pesoNeto: z.number(),
  tipoCombustible: z.number(),
  numeroMotor: z.string(),
  capacidadTraccion: z.number(),
  año: z.number(),
  tipoVehiculo: z.string(),
  cilindradas: z.string(),
});
export type SectorAutomotor = z.infer<typeof SectorAutomotorSchema>;