import { z } from 'zod';
import { PresenceIndicator } from '../../constants/presenceIndicators.constants';
import DateHelper from '../../helpers/DateHelper';
import { enumToZodUnion } from '../../helpers/validation/enumConverter';
import CommonValidators from '../../helpers/validation/CommonValidators';

export const FacturaSchema = z.object({
  // E011
  presencia: z.union(enumToZodUnion(PresenceIndicator)),
  
  // E013
  fechaEnvio: CommonValidators.isoDate(),
});

export type Factura = z.infer<typeof FacturaSchema>;