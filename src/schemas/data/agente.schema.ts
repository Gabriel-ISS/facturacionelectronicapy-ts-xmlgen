import { z } from 'zod';
import CommonValidators from '../../helpers/validation/CommonValidators';
import SDParser from '../../helpers/SDParser';

export const AgenteSchema = z
  .object({
    // E994
    nombre: CommonValidators.name()
      .optional()
      .describe(SDParser.stringify('E994')),

    // para obtener E995 y E996
    ruc: CommonValidators.ruc()
      .optional()
      .describe(SDParser.stringify('E995 y E996', { ej: '123123-1' })),

    // E997
    direccion: CommonValidators.address()
      .optional()
      .describe(SDParser.stringify('E997')),
  })
  .transform((data, ctx) => {
    const [rucID, rucDV] = data.ruc?.split('-') ?? [];

    return {
      ...data,

      // E995
      rucID,

      // E996
      rucDV,
    };
  });

export type Agente = z.infer<typeof AgenteSchema>;
