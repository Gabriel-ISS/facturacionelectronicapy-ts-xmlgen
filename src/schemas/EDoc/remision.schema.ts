import { z } from 'zod';
import { FreightResponsible } from '../../constants/freightResponsibles.constants';
import { RemissionReason } from '../../constants/remissionReasons.constants';
import DateHelper from '../../helpers/DateHelper';
import { enumToZodUnion } from '../../helpers/validation/enumConverter';
import constantsService from '../../services/constants.service';
import NumberLength from '../../helpers/validation/NumberLenght';
import CommonValidators from '../../helpers/validation/CommonValidators';
import dbService from '../../services/db.service';

/**E6. Campos que componen la Nota de Remisión Electrónica (E500-E599) */
export const RemisionSchema = z
  .object({
    // E501
    motivo: z.union(enumToZodUnion(RemissionReason), {
      required_error: 'El motivo de la emisión es requerido',
    }),

    // E503,
    tipoResponsable: z.union(enumToZodUnion(FreightResponsible), {
      required_error: 'El tipo de responsable es requerido',
    }),

    // E505
    kms: z
      .number({
        required_error: 'Los kilómetros estimados de recorrido son requeridos',
      })
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).int().max(5);
      }),

    // E506
    fechaFactura: CommonValidators.isoDate().optional(),

    // E507: TODO: CÓDIGO NO ENCONTRADO
    /* costoFlete: z.number().optional(), */
  })
  .transform((data, ctx) => {
    return {
      ...data,

      // E502
      motivoDescripcion: dbService
        .select('remissionReasons')
        .findById(data.motivo).description,

      // E504
      descripcionTipoResponsable: dbService
        .select('freightResponsibles')
        .findById(data.tipoResponsable).description,
    };
  });

export type Remision = z.infer<typeof RemisionSchema>;
