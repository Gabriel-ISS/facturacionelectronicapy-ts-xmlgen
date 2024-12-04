import { z } from 'zod';
import { CreditNoteReason } from '../../data/creditNoteReasons.table';

import dbService from '../../services/db.service';

/** E5. Campos que componen la Nota de Crédito/Débito Electrónica NCE-NDE (E400-E499) */
export const NotaCreditoDebitoSchema = z.object({
  // E401
  motivo: z.nativeEnum(CreditNoteReason),
}).transform((data, ctx) => {
  return {
    ...data,

    // E402
    motivoDescripcion: dbService
      .creditNoteReasons
      ._findById(data.motivo).description,
  };
});

export type NotaCreditoDebito = z.infer<typeof NotaCreditoDebitoSchema>;