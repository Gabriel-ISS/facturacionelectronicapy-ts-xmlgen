import { z } from 'zod';
import { FreightResponsible } from '../../constants/freightResponsibles.constants';
import { RemissionReason } from '../../constants/remissionReasons.constants';
import CommonValidators from '../../helpers/validation/CommonValidators';
import NumberLength from '../../helpers/validation/NumberLenght';
import ZodValidator from '../../helpers/validation/ZodValidator';
import dbService from '../../services/db.service';

/**E6. Campos que componen la Nota de Remisión Electrónica (E500-E599) */
export const RemisionSchema = z
  .object({
    // E501
    motivo: z.nativeEnum(RemissionReason, {
      required_error: 'El motivo de la emisión es requerido',
    }),

    // E502
    motivoDescripcion: z.string().min(5).max(60).optional(),

    // E503,
    tipoResponsable: z.nativeEnum(FreightResponsible, {
      required_error: 'El tipo de responsable es requerido',
    }),

    // E505
    kms: z
      .number({
        required_error: 'Los kilómetros estimados de recorrido son requeridos',
      })
      .superRefine((value, ctx) => {
        new NumberLength(value, ctx).int().max(5);
      }),

    // E506
    fechaFactura: CommonValidators.isoDate().optional(),

    // E507
    // VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_010_MT_V150.pdf/d64a693b-6c63-86e1-ec6a-d4fe5ec4eeea?t=1687353747196
    costoFlete: z.number().optional().superRefine((value, ctx) => {
      if (value == undefined) return;
      new NumberLength(value, ctx).max(15).maxDecimals(8);
    }),
  })
  .transform((data, ctx) => {
    const validator = new ZodValidator(ctx, data);

    // E502 - motivoDescripcion
    {
      /*
      Si E501=99 describir el motivo de la emisión
      */
      if (data.motivo == RemissionReason.OTRO) {
        validator.requiredField('motivoDescripcion');
      }
    }

    return {
      ...data,

      // E504
      descripcionTipoResponsable: dbService
        .select('freightResponsibles')
        .findById(data.tipoResponsable).description,
    };
  });

export type Remision = z.infer<typeof RemisionSchema>;
