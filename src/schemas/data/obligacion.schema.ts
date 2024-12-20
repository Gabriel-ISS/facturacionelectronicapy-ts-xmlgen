import { z } from 'zod';
import { Obligation } from '../../data/obligations.table';
import dbService from '../../services/db.service';
import SDParser from '../../helpers/SDParser';

/**D1.1. Campos que identifican las obligaciones afectadas (D030-D040)
 * VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_018_MT_V150-+Junio.pdf/2ace18c4-5c03-c339-7f5c-bed6d5b5eb5e?t=1717699899642
 */
export const ObligacionSchema = z
  .object({
    // D031
    codigo: z
      .nativeEnum(Obligation)
      .describe(SDParser.stringify('D031', { e: 'Obligation' })),
  })
  .transform((data, ctx) => {
    return {
      ...data,

      // D032
      descripcion: dbService.obligations._findById(data.codigo).description,
    };
  });

export type Obligacion = z.infer<typeof ObligacionSchema>;
