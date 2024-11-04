import { z } from 'zod';
import { Currency } from '../../constants/curencies.constants';
import { PaymentType } from '../../constants/paymentTypes.constants';
import { enumToZodUnion, enumToZodEnum } from '../../helpers/validation/enumConverter';
import { InfoChequeSchema } from './infoCheque.schema';
import { InfoTarjetaSchema } from './infoTarjeta.schema';
import constantsService from '../../services/constants.service';
import NumberLength from '../../helpers/validation/NumberLenght';
import CommonValidators from '../../helpers/validation/CommonValidators';

export const EntregasSchema = z
  .object({
    // E606
    tipo: z.union(enumToZodUnion(PaymentType), {
      required_error: 'El tipo de pago es requerido',
    }),

    // E607
    tipoDescripcion: z.string().min(4).max(30).optional(),

    // E608
    monto: z.number({
      required_error: 'El monto por tipo de pago es requerido',
    }).superRefine((value, ctx) => {
      if (value == undefined) return;
      new NumberLength(value, ctx).max(15).maxDecimals(4);
    }),

    // E609: TODO: "Se requiere la misma moneda para todos los ítems del DE"
    moneda: CommonValidators.currency(),

    // E611
    cambio: CommonValidators.currencyChange().optional(),

    // Campos que describen el pago o entrega inicial de la operación con tarjeta de crédito/débito
    infoTarjeta: InfoTarjetaSchema.optional(),

    // Campos que describen el pago o entrega inicial de la operación con cheque
    infoCheque: InfoChequeSchema.optional(),
  })
  .transform((entrega, ctx) => {
    if (entrega.tipo == PaymentType.OTRO) {
      if (!entrega.tipoDescripcion) {
        ctx.addIssue({
          path: ['tipoDescripcion'],
          code: z.ZodIssueCode.custom,
          message:
            'Debe proveer el tipo de pago personalizado en entregas.tipoDescripcion',
        });
      }
    } else {
      const foundPaymentType = constantsService.paymentTypes.find(
        (d) => d._id == entrega.tipo,
      );

      entrega.tipoDescripcion = foundPaymentType?.description;
    }

    if (entrega.moneda != Currency.GUARANI) {
      if (!entrega.cambio) {
        ctx.addIssue({
          path: ['cambio'],
          code: z.ZodIssueCode.custom,
          message: 'Debe proveer el cambio en entregas.cambio',
        });
      }
    }

    if (
      entrega.tipo == PaymentType.TARJETA_DE_CREDITO ||
      entrega.tipo == PaymentType.TARJETA_DE_DEBITO
    ) {
      if (!entrega.infoTarjeta) {
        ctx.addIssue({
          path: ['infoTarjeta'],
          code: z.ZodIssueCode.custom,
          message:
            'Debe proveer los datos del tarjeta de crédito/débito en entregas.infoTarjeta',
        });
      }
    }

    return {
      ...entrega,
      tipoDescripcion: entrega.tipoDescripcion || '',
    }
  });
  
export type Entregas = z.infer<typeof EntregasSchema>;