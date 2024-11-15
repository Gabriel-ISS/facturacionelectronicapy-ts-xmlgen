import { z } from 'zod';
import { Currency } from '../../constants/curencies.constants';
import { PaymentType } from '../../constants/paymentTypes.constants';
import CommonValidators from '../../helpers/validation/CommonValidators';
import { enumToZodUnion } from '../../helpers/validation/enumConverter';
import NumberLength from '../../helpers/validation/NumberLenght';
import ZodValidator from '../../helpers/validation/ZodValidator';
import constantsService from '../../services/constants.service';
import { InfoChequeSchema } from './infoCheque.schema';
import { InfoTarjetaSchema } from './infoTarjeta.schema';
import dbService from '../../services/db.service';

/**E7.1. Campos que describen la forma de pago de la operación al contado o del monto de la entrega inicial (E605-E619) */
export const EntregaSchema = z
  .object({
    // E606
    tipo: z.union(enumToZodUnion(PaymentType), {
      required_error: 'El tipo de pago es requerido',
    }),

    // E607
    tipoDescripcion: z.string().min(4).max(30).optional(),

    // E608
    monto: z
      .number({
        required_error: 'El monto por tipo de pago es requerido',
      })
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).max(15).maxDecimals(4);
      }),

    // E609: TODO: "Se requiere la misma moneda para todos los ítems del DE"
    moneda: CommonValidators.currency(),

    // E611
    cambio: CommonValidators.currencyChange().optional(),

    // (E620) E7.1.1.Campos que describen el pago o entrega inicial de la operación con tarjeta de crédito/débito
    infoTarjeta: InfoTarjetaSchema.optional(),

    // E7.1.2.Campos que describen el pago o entrega inicial de la operación con cheque (E630-E639)
    infoCheque: InfoChequeSchema.optional(),
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
        const foundPaymentType = dbService
          .select('paymentTypes')
          .findById(data.tipo, {
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
      monedaDescripcion: dbService.select('currencies').findById(data.moneda)
        .description,
    };
  });

export type Entrega = z.infer<typeof EntregaSchema>;
