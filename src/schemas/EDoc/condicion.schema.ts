import { z } from 'zod';
import { PaymentCondition } from '../../constants/paymentCondition.constants';
import { enumToZodUnion } from '../../helpers/validation/enumConverter';
import { EntregasSchema } from './entregas.schema';
import dbService from '../../services/db.service';

export const CondicionSchema = z
  .object({
    // E601
    tipo: z.union(enumToZodUnion(PaymentCondition), {
      required_error: 'La condición de la operación es requerida',
    }),

    // E7.1. Campos que describen la forma de pago de la operación al contado o del monto de la entrega inicial (E605-E619)
    entregas: z.array(EntregasSchema).optional(),

    // TODO: SIN CÓDIGO
    /* credito: z
    .string()
    .optional(), */
  })
  .superRefine((data, ctx) => {
    return {
      ...data,

      // E602
      tipoDescripcion: dbService.select('paymentConditions').findById(data.tipo)
        .description,
    };
  });

export type Condicion = z.infer<typeof CondicionSchema>;
