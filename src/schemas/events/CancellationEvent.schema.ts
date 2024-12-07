import { z } from 'zod';
import CommonValidators from '../../helpers/validation/CommonValidators';
import SDParser from '../../helpers/SDParser';

// GEC001
export const CancellationEventSchema = z.object({
  // GEC002
  cdc: CommonValidators.cdc().describe(SDParser.stringify('GEC002')),

  // GEC003
  motivo: CommonValidators.motive().describe(SDParser.stringify('GEC003')),
});

export type CancellationEventInput = z.input<typeof CancellationEventSchema>;
