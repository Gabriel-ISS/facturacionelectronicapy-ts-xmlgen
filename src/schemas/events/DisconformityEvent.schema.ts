import { z } from 'zod';
import CommonValidators from '../../helpers/validation/CommonValidators';
import SDParser from '../../helpers/SDParser';

// GDI001
export const DisconformityEventSchema = z.object({
  // GDI002
  cdc: CommonValidators.cdc().describe(SDParser.stringify('GDI002')),

  // GDI003
  motivo: CommonValidators.motive().describe(SDParser.stringify('GDI003')),
});

export type DisconformityEventInput = z.input<typeof DisconformityEventSchema>;
