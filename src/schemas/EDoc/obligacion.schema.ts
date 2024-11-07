import { z } from 'zod';
import { enumToZodUnion } from '../../helpers/validation/enumConverter';
import { Obligation } from '../../constants/obligations.constants';
import dbService from '../../services/db.service';

/**D1.1. Campos que identifican las obligaciones afectadas (D030-D040) */
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
