import { z } from 'zod';
import CommonValidators from '../../helpers/validation/CommonValidators';
import NumberLength from '../../helpers/validation/NumberLenght';
import dbService from '../../services/db.service';
import SDParser from '../../helpers/SDParser';

/**E7.2.1.Campos que describen las cuotas (E650-E659) */
export const InfoCuotaSchema = z
  .object({
    // E751
    monto: z
      .number()
      .superRefine((value, ctx) => {
        new NumberLength(value, ctx).max(15).maxDecimals(4);
      })
      .describe(SDParser.stringify('E751')),

    // E752
    vencimiento: CommonValidators.isoDate()
      .optional()
      .describe(SDParser.stringify('E752')),

    // E753
    moneda: CommonValidators.currency().describe(
      SDParser.stringify('E753', {
        e: 'Currency',
      }),
    ),
  })
  .transform((data, ctx) => {
    return {
      ...data,

      // E754
      monedaDescripcion: dbService.currencies._findById(data.moneda)
        .description,
    };
  });

export type InfoCuota = z.infer<typeof InfoCuotaSchema>;
