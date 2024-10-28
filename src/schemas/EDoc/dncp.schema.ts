import { z } from 'zod';

export const DncpSchema = z.object({
   // E021
   modalidad: z.string(),

   // E022
   entidad: z.number(),
 
   // E023
   año: z.number(),
 
   // E024
   secuencia: z.number(),
 
   // E025
   fecha: z.string(),
});

export type Dncp = z.infer<typeof DncpSchema>;