import { z } from 'zod';
import { PaymentCondition } from '../../constants/paymentCondition.constants';
import { enumToZodUnion } from '../../helpers/validation/enumConverter';
import { EntregasSchema } from './entregas.schema';
import dbService from '../../services/db.service';
import ZodValidator from '../../helpers/validation/ZodValidator';
import { CreditoSchema } from './credito.schema';

export const CondicionSchema = z
  .object({
    // E601
    tipo: z.union(enumToZodUnion(PaymentCondition), {
      required_error: 'La condición de la operación es requerida',
    }),

    // E7.1. Campos que describen la forma de pago de la operación al contado o del monto de la entrega inicial (E605-E619)
    entregas: z.array(EntregasSchema).optional(),

    // E7.2. Campos que describen la operación a crédito (E640-E649)
    credito: CreditoSchema.optional(),
  })
  .superRefine((data, ctx) => {
    const validator = new ZodValidator(ctx, data);

    const isInCash = data.tipo == PaymentCondition.CONTADO;
    const isInCredit = data.tipo == PaymentCondition.CREDITO;

    // E605 - entregas
    {
      /*
      Obligatorio si E601 = 1
      Obligatorio si existe el campo E645
      */
     if (isInCash || data.credito?.montoEntregaInicial) {
        validator.requiredField('entregas');
      }
    }

    // E640 - credito
    {
      /*
      Obligatorio si E601 = 2
      No informar si E601 ≠ 2
      */
      if (isInCredit) {
        validator.requiredField('credito');
      } else {
        validator.undesiredField('credito');
      }
    }

    return {
      ...data,

      // E602
      tipoDescripcion: dbService.select('paymentConditions').findById(data.tipo)
        .description,
    };
  });

export type Condicion = z.infer<typeof CondicionSchema>;
