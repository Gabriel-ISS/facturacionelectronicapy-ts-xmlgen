import { z } from 'zod';
import { CreditCardProcessingMethod } from '../../constants/creditCardProcessingMethods.constants';
import { CreditCard } from '../../constants/creditCards.constants';
import { enumToZodUnion } from '../../helpers/zod.helpers';

export const InfoTarjetaSchema = z
  .object({
    // E621
    tipo: z.union(enumToZodUnion(CreditCard), {
      required_error: 'El tipo de tarjeta es requerido',
    }),

    // E622
    tipoDescripcion: z.string().optional(),

    // E629
    numero: z.string().length(4).optional(),

    // E628
    titular: z.string().optional(),

    // E624
    ruc: z.string().optional(),

    // E623
    razonSocial: z.string().optional(),

    // E626
    medioPago: z.union(enumToZodUnion(CreditCardProcessingMethod), {
      required_error: 'El medio de pago es requerido',
    }),

    // E627
    codigoAutorizacion: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.tipo == CreditCard.OTRO && !data.tipoDescripcion) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Si la tarjeta es otra, debe proveer la descripción',
        path: ['tipoDescripcion'],
      });
    }
  });
export type InfoTarjeta = z.infer<typeof InfoTarjetaSchema>;