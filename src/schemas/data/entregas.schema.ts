import { z } from 'zod';
import { Currency } from '../../data/currencies.table';
import { PaymentType } from '../../data/paymentTypes.table';
import CommonValidators from '../../helpers/validation/CommonValidators';

import NumberLength from '../../helpers/validation/NumberLenght';
import ZodValidator from '../../helpers/validation/ZodValidator';
import dbService from '../../services/db.service';
import { InfoChequeSchema } from './infoCheque.schema';
import { InfoTarjetaSchema } from './infoTarjeta.schema';
import SDParser from '../../helpers/SDParser';

/**E7.1. Campos que describen la forma de pago de la operación al contado o del monto de la entrega inicial (E605-E619) */
export const EntregaSchema = z
  .object({
    // E606
    tipo: z
      .nativeEnum(PaymentType)
      .describe(SDParser.stringify('E606', { e: 'PaymentType' })),

    // E607
    tipoDescripcion: z
      .string()
      .min(4)
      .max(30)
      .optional()
      .describe(SDParser.stringify('E607')),

    // E608
    monto: z
      .number()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).max(15).maxDecimals(4);
      })
      .describe(SDParser.stringify('E608')),

    // E609
    moneda: CommonValidators.currency().describe(
      SDParser.stringify('E609', { e: 'Currency' }),
    ),

    // E611
    cambio: CommonValidators.currencyChange()
      .optional()
      .describe(SDParser.stringify('E611')),

    // (E620) E7.1.1.Campos que describen el pago o entrega inicial de la operación con tarjeta de crédito/débito
    infoTarjeta: InfoTarjetaSchema.optional().describe(
      SDParser.stringify('E7.1.1', {
        d: 'Campos que describen el pago o entrega inicial de la operación con tarjeta de crédito/débito',
      }),
    ),

    // E7.1.2.Campos que describen el pago o entrega inicial de la operación con cheque (E630-E639)
    infoCheque: InfoChequeSchema.optional().describe(
      SDParser.stringify('E7.1.2', {
        d: 'Campos que describen el pago o entrega inicial de la operación con cheque (E630-E639)',
      }),
    ),
  })
  .transform((data, ctx) => {
    const validator = new ZodValidator(ctx, data);

    /**E606 = 99 */
    const isOtherPaymentType = data.tipo == PaymentType.OTRO;
    /**E606 = 2 */
    const isCheckPayment = data.tipo == PaymentType.CHEQUE;
    /**E606 = 3 */
    const isCreditCartPayment = data.tipo == PaymentType.TARJETA_DE_CREDITO;
    /**E606 = 4 */
    const isDebitCartPayment = data.tipo == PaymentType.TARJETA_DE_DEBITO;
    /**E609 = PYG */
    const isGuarani = data.moneda == Currency.GUARANI;

    // E607 - tipoDescripcion
    {
      /*
      Si E606 = 99, informar el tipo de pago
      */
      if (isOtherPaymentType) {
        validator.requiredField('tipoDescripcion');
      } else {
        const foundPaymentType = dbService.paymentTypes._findById(data.tipo, {
          ctx,
          fieldName: 'entregas.tipoDescripcion',
        });
        data.tipoDescripcion = foundPaymentType?.description;
      }
    }

    // E611 - cambio
    {
      /*
      Obligatorio si E609 ≠ PYG
      */
      if (!isGuarani) {
        validator.requiredField('cambio');
      } else {
        // ⚠️ esto parece necesario aunque no se especifica
        validator.undesiredField('cambio');
      }
    }

    // E620 - infoTarjeta
    {
      /*
      Se activa si E606 = 3 o 4
      */
      if (isCreditCartPayment || isDebitCartPayment) {
        validator.requiredField('infoTarjeta');
      }
    }

    // E630 - infoCheque
    {
      /*
      Se activa si E606 = 2
      */
      if (isCheckPayment) {
        validator.requiredField('infoCheque');
      }
    }

    return {
      ...data,
      tipoDescripcion: data.tipoDescripcion as string,

      // E610
      monedaDescripcion: dbService.currencies._findById(data.moneda)
        .description,
    };
  });

export type Entrega = z.infer<typeof EntregaSchema>;
