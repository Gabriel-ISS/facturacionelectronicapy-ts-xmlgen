import { z } from 'zod';
import { CreditCardProcessingMethod } from '../../data/creditCardProcessingMethods.table';
import { CreditCard } from '../../data/creditCards.table';

import CommonValidators from '../../helpers/validation/CommonValidators';
import NumberLength from '../../helpers/validation/NumberLenght';
import ZodValidator from '../../helpers/validation/ZodValidator';
import dbService from '../../services/db.service';
import SDParser from '../../helpers/SDParser';

/** (E620) E7.1.1.Campos que describen el pago o entrega inicial de la operación con tarjeta de crédito/débito */
export const InfoTarjetaSchema = z
  .object({
    // E621
    tipo: z
      .nativeEnum(CreditCard)
      .describe(SDParser.stringify('E621', { e: 'CreditCard' })),

    // E622
    tipoDescripcion: z
      .string()
      .optional()
      .describe(
        SDParser.stringify('E622', {
          d: 'Obligatorio si E621 = 99 (tipo = OTRO)',
        }),
      ),

    // E623
    razonSocial: z
      .string()
      .min(4)
      .max(60)
      .optional()
      .describe(SDParser.stringify('E623')),

    // para obtener E624 y E625
    ruc: CommonValidators.ruc().optional().describe(SDParser.stringify('E624')),

    // E626
    medioPago: z
      .nativeEnum(CreditCardProcessingMethod)
      .describe(
        SDParser.stringify('E626', { e: 'CreditCardProcessingMethod' }),
      ),

    // E627
    codigoAutorizacion: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).int().min(6).max(10);
      })
      .describe(SDParser.stringify('E627')),

    // E628
    titular: z
      .string()
      .min(4)
      .max(30)
      .optional()
      .describe(SDParser.stringify('E628')),

    // E629
    numero: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).int().length(4);
      })
      .describe(SDParser.stringify('E629')),
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
        dbService.creditCards._findById(data.tipo).description,

      // E624
      rucID,

      // E625
      rucDV,
    };
  });

export type InfoTarjeta = z.infer<typeof InfoTarjetaSchema>;
