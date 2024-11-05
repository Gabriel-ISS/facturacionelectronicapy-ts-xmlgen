import { z } from 'zod';
import { PresenceIndicator } from '../../constants/presenceIndicators.constants';
import CommonValidators from '../../helpers/validation/CommonValidators';
import { enumToZodUnion } from '../../helpers/validation/enumConverter';
import dbService from '../../services/db.service';

/**E1. Campos que componen la Factura Electrónica FE (E002-E099) */
export const FacturaSchema = z
  .object({
    // E011
    presencia: z.union(enumToZodUnion(PresenceIndicator)),

    // E013
    fechaEnvio: CommonValidators.isoDate(),
  })
  .transform((data, ctx) => {
    return {
      ...data,
      descripcionPresencia: dbService
        .select('presenceIndicators')
        .findById(data.presencia).description,
    };
  });

export type Factura = z.infer<typeof FacturaSchema>;
