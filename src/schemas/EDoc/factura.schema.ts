import { z } from 'zod';
import { PresenceIndicator } from '../../constants/presenceIndicators.constants';
import DateHelper from '../../helpers/DateHelper';
import { enumToZodUnion } from '../../helpers/validation/enumConverter';

export const FacturaSchema = z.object({
  // E011
  presencia: z.union(enumToZodUnion(PresenceIndicator)),
  
  // E013
  fechaEnvio: z.coerce.date().transform(
    (date) => {
      return DateHelper.getIsoDateString(date);
    }
  ),
});

export type Factura = z.infer<typeof FacturaSchema>;