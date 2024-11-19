import { z } from 'zod';
import CommonValidators from '../../helpers/validation/CommonValidators';

// GDI001
export const DisconformityEventSchema = z.object({
  // GDI002
  cdc: CommonValidators.cdc(),

  // GDI003
  motivo: CommonValidators.motive(),
});

export type DisconformityEventInput = z.input<typeof DisconformityEventSchema>;