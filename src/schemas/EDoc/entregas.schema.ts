import { z } from 'zod';
import { Currency } from '../../constants/curencies.constants';
import { PaymentType } from '../../constants/paymentTypes.constants';
import { enumToZodUnion, enumToZodEnum } from '../../helpers/zod.helpers';
import { InfoChequeSchema } from './infoCheque.schema';
import { InfoTarjetaSchema } from './infoTarjeta.schema';

export const EntregasSchema = z
  .object({
    // E606
    tipo: z.union(enumToZodUnion(PaymentType), {
      required_error: 'El tipo de pago es requerido',
    }),

    // E607
    tipoDescripcion: z.string().optional(),

    // E608
    monto: z.number({
      required_error: 'El monto por tipo de pago es requerido',
    }),

    // E609
    moneda: z.enum(enumToZodEnum(Currency), {
      required_error: 'La moneda por tipo de pago es requerida',
    }),

    // E611
    cambio: z.number().optional(),

    // Campos que describen el pago o entrega inicial de la operación con tarjeta de crédito/débito
    infoTarjeta: InfoTarjetaSchema.optional(),

    // Campos que describen el pago o entrega inicial de la operación con cheque
    infoCheque: InfoChequeSchema.optional().describe(
      'Campos que describen el pago o entrega inicial de la operación con cheque',
    ),
  })
  .superRefine((entregas, ctx) => {
    if (entregas.tipo == PaymentType.OTRO) {
      if (!entregas.tipoDescripcion) {
        ctx.addIssue({
          path: ['tipoDescripcion'],
          code: z.ZodIssueCode.custom,
          message:
            'Debe proveer el tipo de pago personalizado en entregas.tipoDescripcion',
        });
      }
    }

    if (entregas.moneda != Currency.GUARANI) {
      if (!entregas.cambio) {
        ctx.addIssue({
          path: ['cambio'],
          code: z.ZodIssueCode.custom,
          message: 'Debe proveer el cambio en entregas.cambio',
        });
      }
    }

    // TODO: VERIFICAR
    if (
      entregas.tipo == PaymentType.TARJETA_DE_CREDITO ||
      entregas.tipo == PaymentType.TARJETA_DE_DEBITO
    ) {
      if (!entregas.infoTarjeta) {
        ctx.addIssue({
          path: ['infoTarjeta'],
          code: z.ZodIssueCode.custom,
          message:
            'Debe proveer los datos del tarjeta de crédito/débito en entregas.infoTarjeta',
        });
      }
    }
  });
export type Entregas = z.infer<typeof EntregasSchema>;