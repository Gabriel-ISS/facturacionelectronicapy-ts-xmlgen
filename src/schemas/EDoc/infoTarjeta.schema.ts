import { z } from 'zod';
import { CreditCardProcessingMethod } from '../../constants/creditCardProcessingMethods.constants';
import { CreditCard } from '../../constants/creditCards.constants';
import { enumToZodUnion } from '../../helpers/validation/Common';
import constantsService from '../../services/constants.service';

export const InfoTarjetaSchema = z
  .object({
    // E621
    tipo: z.union(enumToZodUnion(CreditCard), {
      required_error: 'El tipo de tarjeta es requerido',
    }),

    // E622
    tipoDescripcion: z.string().optional(),

    // E623
    razonSocial: z.string().min(4).max(60).optional(),

    // E624
    ruc: z.string().min(3).max(8).optional(),

    // E626
    medioPago: z.union(enumToZodUnion(CreditCardProcessingMethod), {
      required_error: 'El medio de pago es requerido',
    }),

    // E627
    codigoAutorizacion: z.number().min(1000).max(9999999999).optional(),

    // E628
    titular: z.string().min(4).max(30).optional(),

    // E629
    numero: z.string().length(4).optional(),
  })
  .transform((data, ctx) => {
    if (data.tipo == CreditCard.OTRO && !data.tipoDescripcion) {
      if (!data.tipoDescripcion) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Si la tarjeta es otra, debe proveer la descripción',
          path: ['tipoDescripcion'],
        });
      }
    } else {
      const foundCreditCard = constantsService.creditCards.find(
        (d) => d._id == data.tipo,
      );

      data.tipoDescripcion = foundCreditCard?.description;
    }

    return {
      ...data,
      tipoDescripcion: data.tipoDescripcion || '',
    };
  });

export type InfoTarjeta = z.infer<typeof InfoTarjetaSchema>;
