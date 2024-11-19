import { z } from 'zod';

import ZodValidator from '../../helpers/validation/ZodValidator';
import CommonValidators from '../../helpers/validation/CommonValidators';


export enum ConformityType {
  TOTAL = 1,
  PARTIAL = 2,
}

// GEC001
export const ConformityEventSchema = z.object({
  // GCO002
  cdc: CommonValidators.cdc(),

  // GCO003
  tipoConformidad: z.nativeEnum(ConformityType),

  // GCO004
  fechaRecepcion: CommonValidators.isoDateTime().optional(),
}).superRefine((value, ctx) => {
  const validator = new ZodValidator(ctx, value);

  if (value.tipoConformidad == ConformityType.PARTIAL) {
    validator.requiredField('fechaRecepcion');
  }
});

export type ConformityEventInput = z.input<typeof ConformityEventSchema>;