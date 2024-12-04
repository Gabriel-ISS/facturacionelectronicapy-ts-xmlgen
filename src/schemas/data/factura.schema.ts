import { z } from 'zod';
import { PresenceIndicator } from '../../data/presenceIndicators.table';
import CommonValidators from '../../helpers/validation/CommonValidators';

import dbService from '../../services/db.service';
import ZodValidator from '../../helpers/validation/ZodValidator';

/** (E010) E1. Campos que componen la Factura Electrónica FE (E002-E099) */
export const FacturaSchema = z
  .object({
    // E011
    presencia: z.nativeEnum(PresenceIndicator),

    // E012
    descripcionPresencia: z.string().min(10).max(30).optional(),

    // E013
    fechaEnvio: CommonValidators.isoDate().optional(),
  })
  .transform((data, ctx) => {
    const validator = new ZodValidator(ctx, data);

    const presenceIsOther = data.presencia == PresenceIndicator.OTRO;

    // E012 - descripcionPresencia
    let descripcionPresencia = data.descripcionPresencia;
    {
      /*
      Si E011 = 9 informar el indicador de
      presencia
      */
      if (presenceIsOther) {
        validator.requiredField('descripcionPresencia');
      } else {
        descripcionPresencia = dbService
          .presenceIndicators
          ._findByIdIfExist(data.presencia)?.description;
      }
    }

    return {
      ...data,

      // E012
      descripcionPresencia,
    };
  });

export type Factura = z.infer<typeof FacturaSchema>;