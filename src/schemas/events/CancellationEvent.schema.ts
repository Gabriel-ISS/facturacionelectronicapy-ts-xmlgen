import { z } from 'zod';
import CommonValidators from '../../helpers/validation/CommonValidators';

// GEC001
export const CancellationEventSchema = z.object({
  // GEC002
  cdc: CommonValidators.cdc(),

  // GEC003
  motivo: CommonValidators.motive(),
});

export type CancellationEventInput = z.input<typeof CancellationEventSchema>;
