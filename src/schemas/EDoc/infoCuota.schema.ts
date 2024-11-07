import { z } from 'zod';
import CommonValidators from '../../helpers/validation/CommonValidators';
import NumberLength from '../../helpers/validation/NumberLenght';
import dbService from '../../services/db.service';

/**E7.2.1.Campos que describen las cuotas (E650-E659) */
export const InfoCuotaSchema = z
  .object({
    // E751
    monto: z.number().superRefine((value, ctx) => {
      new NumberLength(value, ctx).max(15).maxDecimals(4);
    }),

    // E752
    vencimiento: CommonValidators.isoDate().optional(),

    // E753
    moneda: CommonValidators.currency(),
  })
  .transform((data, ctx) => {
    return {
      ...data,

      // E754
      monedaDescripcion: dbService.select('currencies').findById(data.moneda)
        .description,
    };
  });

export type InfoCuota = z.infer<typeof InfoCuotaSchema>;
