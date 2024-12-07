import { z } from 'zod';

import ZodValidator from '../../helpers/validation/ZodValidator';
import CommonValidators from '../../helpers/validation/CommonValidators';
import SDParser from '../../helpers/SDParser';

export enum ConformityType {
  TOTAL = 1,
  PARTIAL = 2,
}

// GEC001
export const ConformityEventSchema = z
  .object({
    // GCO002
    cdc: CommonValidators.cdc().describe(
      SDParser.stringify('GCO002')
    ),

    // GCO003
    tipoConformidad: z.nativeEnum(ConformityType).describe(
      SDParser.stringify('GCO003',  {
        e: 'ConformityType'
      })
    ),

    // GCO004
    fechaRecepcion: CommonValidators.isoDateTime().optional().describe(
      SDParser.stringify('GCO004')
    ),
  })
  .superRefine((value, ctx) => {
    const validator = new ZodValidator(ctx, value);

    if (value.tipoConformidad == ConformityType.PARTIAL) {
      validator.requiredField('fechaRecepcion');
    }
  });

export type ConformityEventInput = z.input<typeof ConformityEventSchema>;
