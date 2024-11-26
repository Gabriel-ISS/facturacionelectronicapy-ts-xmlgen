import { z } from 'zod';
import { CreditCardProcessingMethod } from '../../constants/creditCardProcessingMethods.constants';
import { CreditCard } from '../../constants/creditCards.constants';

import constantsService from '../../services/constants.service';
import CommonValidators from '../../helpers/validation/CommonValidators';
import NumberLength from '../../helpers/validation/NumberLenght';
import ZodValidator from '../../helpers/validation/ZodValidator';
import dbService from '../../services/db.service';

/** (E620) E7.1.1.Campos que describen el pago o entrega inicial de la operación con tarjeta de crédito/débito */
export const InfoTarjetaSchema = z
  .object({
    // E621
    tipo: z.nativeEnum(CreditCard),

    // E622
    tipoDescripcion: z.string().optional(),

    // E623
    razonSocial: z.string().min(4).max(60).optional(),

    // para obtener E624 y E625
    ruc: CommonValidators.ruc().optional(),

    // E626
    medioPago: z.nativeEnum(CreditCardProcessingMethod),

    // E627
    codigoAutorizacion: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).int().min(6).max(10);
      }),

    // E628
    titular: z.string().min(4).max(30).optional(),

    // E629
    numero: z.number().optional().superRefine((value, ctx) => {
      if (value == undefined) return;
      new NumberLength(value, ctx).int().length(4);
    }),
  })
  .transform((data, ctx) => {
    const validator = new ZodValidator(ctx, data);

    const isOtherCreditCard = data.tipo == CreditCard.OTRO;

    // E622 - tipoDescripcion
    {
      /*
      Si E621 = 99 informar la
      descripción de la denominación
      de la tarjeta
      */
      if (isOtherCreditCard) {
        validator.requiredField('tipoDescripcion');
      }
    }

    const [rucID, rucDV] = data.ruc?.split('-') ?? [];

    return {
      ...data,
      tipoDescripcion:
        data.tipoDescripcion ??
        dbService.select('creditCards').findById(data.tipo),

      // E624
      rucID,

      // E625
      rucDV,
    };
  });

export type InfoTarjeta = z.infer<typeof InfoTarjetaSchema>;
