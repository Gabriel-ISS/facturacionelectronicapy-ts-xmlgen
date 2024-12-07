import { z } from 'zod';
import { InfoCuotaSchema } from './infoCuota.schema';
import { CreditType } from '../../data/creditTypes.table';

import dbService from '../../services/db.service';
import NumberLength from '../../helpers/validation/NumberLenght';
import SDParser from '../../helpers/SDParser';

/**E7.2. Campos que describen la operación a crédito (E640-E649) */
export const CreditoSchema = z
  .object({
    // E641
    tipo: z
      .nativeEnum(CreditType)
      .describe(SDParser.stringify('E641', { e: 'CreditType' })),

    // E643
    plazo: z
      .string()
      .min(2)
      .max(12)
      .optional()
      .describe(SDParser.stringify('E643')),

    // E644
    cuotas: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).int().max(3);
      })
      .describe(SDParser.stringify('E644')),

    // E645: lo calculamos en CondicionSchema

    // E7.2.1.Campos que describen las cuotas (E650-E659)
    infoCuotas: z
      .array(InfoCuotaSchema)
      .max(999)
      .describe(
        SDParser.stringify('E7.2.1', {
          d: 'Campos que describen las cuotas (E650-E659)',
        }),
      ),
  })
  .transform((data, ctx) => {
    return {
      ...data,

      // E642
      tipoDescripcion: dbService.creditTypes._findById(data.tipo).description,
    };
  });

export type Credito = z.infer<typeof CreditoSchema> & {
  // E645
  montoEntregaInicial?: number | undefined;
};
