import { z } from 'zod';
import CommonValidators from '../../helpers/validation/CommonValidators';
import NumberLength from '../../helpers/validation/NumberLenght';
import SDParser from '../../helpers/SDParser';

/**E1.1. Campos de informaciones de Compras Públicas (E020-E029) */
export const DncpSchema = z.object({
  // E021
  modalidad: z.string().length(2).describe(SDParser.stringify('E021')),

  // E022
  entidad: z
    .number()
    .superRefine((value, ctx) => {
      new NumberLength(value, ctx).int().length(5);
    })
    .describe(SDParser.stringify('E022')),

  // E023
  año: z
    .number()
    .superRefine((value, ctx) => {
      new NumberLength(value, ctx).int().length(2);
    })
    .describe(SDParser.stringify('E023')),

  // E024
  secuencia: z
    .number()
    .superRefine((value, ctx) => {
      new NumberLength(value, ctx).int().length(7);
    })
    .describe(SDParser.stringify('E024')),

  // E025
  fecha: CommonValidators.isoDate().describe(SDParser.stringify('E025')),
});

export type Dncp = z.infer<typeof DncpSchema>;
