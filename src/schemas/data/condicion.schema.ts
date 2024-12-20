import { z } from 'zod';
import { PaymentCondition } from '../../data/paymentConditions.table';

import { EntregaSchema } from './entregas.schema';
import dbService from '../../services/db.service';
import ZodValidator from '../../helpers/validation/ZodValidator';
import { Credito, CreditoSchema } from './credito.schema';
import SDParser from '../../helpers/SDParser';

export const CondicionSchema = z
  .object({
    // E601
    tipo: z
      .nativeEnum(PaymentCondition)
      .describe(SDParser.stringify('E601', { e: 'PaymentCondition' })),

    // E7.1. Campos que describen la forma de pago de la operación al contado o del monto de la entrega inicial (E605-E619)
    entregas: z
      .array(EntregaSchema)
      .max(999)
      .optional()
      .describe(
        SDParser.stringify('E7.1', {
          d: 'Campos que describen la forma de pago de la operación al contado o del monto de la entrega inicial (E605-E619)',
        }),
      ),

    // E7.2. Campos que describen la operación a crédito (E640-E649)
    credito: CreditoSchema.optional().describe(
      SDParser.stringify('E7.2', {
        d: 'Campos que describen la operación a crédito (E640-E649)',
      }),
    ),
  })
  .transform((data, ctx) => {
    const validator = new ZodValidator(ctx, data);

    /**E601 = 1 */
    const isInCash = data.tipo == PaymentCondition.CONTADO;
    /**E601 = 2 */
    const isInCredit = data.tipo == PaymentCondition.CREDITO;

    // E605 - entregas
    {
      /*
      Obligatorio si E601 = 1
      Obligatorio si existe el campo E645: esto no se aplica en este repo ya que
      E645 se calcula automáticamente en base a entregas
      */
      if (isInCash) {
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

    // E645 - credito.montoEntregaInicial
    let credito: Credito = data.credito as Credito;
    {
      // ⚠️ esto no es del manual, pero si del repo original
      if (data.credito && data.entregas) {
        credito.montoEntregaInicial = data.entregas.reduce(
          (acc, entrega) => acc + entrega.monto,
          0,
        );
      }
    }

    return {
      ...data,
      credito,

      // E602
      tipoDescripcion: dbService.paymentConditions._findById(data.tipo)
        .description,
    };
  });

export type Condicion = z.infer<typeof CondicionSchema>;
