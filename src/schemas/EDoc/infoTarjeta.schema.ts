import { z } from 'zod';
import { CreditCardProcessingMethod } from '../../constants/creditCardProcessingMethods.constants';
import { CreditCard } from '../../constants/creditCards.constants';
import { enumToZodUnion } from '../../helpers/validation/enumConverter';
import constantsService from '../../services/constants.service';
import CommonValidators from '../../helpers/validation/CommonValidators';
import NumberLength from '../../helpers/validation/NumberLenght';
import ZodValidator from '../../helpers/validation/ZodValidator';

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
    ruc: CommonValidators.ruc().optional(),

    // E626
    medioPago: z.union(enumToZodUnion(CreditCardProcessingMethod), {
      required_error: 'El medio de pago es requerido',
    }),

    // E627
    codigoAutorizacion: z.number().optional().superRefine((value, ctx) => {
      if (value == undefined) return;
      new NumberLength(value, ctx).int().min(6).max(10);
    }),

    // E628
    titular: z.string().min(4).max(30).optional(),

    // E629
    numero: z.string().length(4).optional(),
  })
  .transform((data, ctx) => {
    const validator = new ZodValidator(ctx, data);

    if (data.tipo == CreditCard.OTRO) {
      validator.requiredField('tipoDescripcion')
    } else {
      const foundCreditCard = constantsService.creditCards.find(
        (d) => d._id == data.tipo,
      );

      data.tipoDescripcion = foundCreditCard?.description;
    }

    return {
      ...data,
      tipoDescripcion: data.tipoDescripcion as string,
    };
  });

export type InfoTarjeta = z.infer<typeof InfoTarjetaSchema>;
