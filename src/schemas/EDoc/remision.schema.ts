import { z } from 'zod';
import { FreightResponsible } from '../../constants/freightResponsibles.constants';
import { RemissionReason } from '../../constants/remissionReasons.constants';
import DateHelper from '../../helpers/DateHelper';
import { enumToZodUnion } from '../../helpers/zod.helpers';

export const RemisionSchema = z.object({
  // E501
  motivo: z.union(enumToZodUnion(RemissionReason), {
    required_error: 'El motivo de la emisión es requerido',
  }),

  // E502
  motivoDescripcion: z.string().optional(),

  // E503, E504
  tipoResponsable: z.union(enumToZodUnion(FreightResponsible), {
    required_error: 'El tipo de responsable es requerido',
  }),

  // E505
  kms: z.number({
    required_error: 'Los kilómetros estimados de recorrido son requeridos',
  }),

  // E506
  fechaFactura: z
    .string()
    .optional()
    .refine(
      (date) => {
        if (!date) return true;
        return DateHelper.isIsoDate(date);
      },
      {
        message: 'La fecha debe estar en el formato ISO 8601',
      },
    ),

  // E507
  costoFlete: z.number().optional(),
});
export type Remision = z.infer<typeof RemisionSchema>;