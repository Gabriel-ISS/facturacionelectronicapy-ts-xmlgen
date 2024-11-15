import { z } from 'zod';
import { enumToZodUnion } from '../../helpers/validation/enumConverter';
import { Obligation } from '../../constants/obligations.constants';
import dbService from '../../services/db.service';

/**D1.1. Campos que identifican las obligaciones afectadas (D030-D040) 
 * VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_018_MT_V150-+Junio.pdf/2ace18c4-5c03-c339-7f5c-bed6d5b5eb5e?t=1717699899642
*/
export const ObligacionSchema = z
  .object({
    // D031
    codigo: z.union(enumToZodUnion(Obligation)),
  })
  .transform((data, ctx) => {
    return {
      ...data,

      // D032
      descripcion: dbService.select('obligations').findById(data.codigo)
        .description,
    };
  });
