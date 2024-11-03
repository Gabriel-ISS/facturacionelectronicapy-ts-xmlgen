import { z } from 'zod';
import { FreightResponsible } from '../../constants/freightResponsibles.constants';
import { RemissionReason } from '../../constants/remissionReasons.constants';
import DateHelper from '../../helpers/DateHelper';
import { enumToZodUnion } from '../../helpers/zod.helpers';
import constantsService from '../../services/constants.service';

export const RemisionSchema = z.object({
  // E501
  motivo: z.union(enumToZodUnion(RemissionReason), {
    required_error: 'El motivo de la emisión es requerido',
  }),

  // E502
  motivoDescripcion: z.string().optional(),

  // E503, 
  tipoResponsable: z.union(enumToZodUnion(FreightResponsible), {
    required_error: 'El tipo de responsable es requerido',
  }),

  // E505
  kms: z.number({
    required_error: 'Los kilómetros estimados de recorrido son requeridos',
  }).min(1).max(99999).optional(),

  // E506
  fechaFactura: z
    .coerce.date()
    .optional()
    .transform(
      (date) => {
        if (!date) return date;
        return DateHelper.getIsoDateString(date);
      }
    ),

  // E507: TODO: CÓDIGO NO ENCONTRADO
  costoFlete: z.number().optional(),
}).transform((data, ctx) => {
  const motive = constantsService.remissionReasons.find(
    d => d._id = data.motivo
  )

  const responsibleType = constantsService.freightResponsibles.find(
    d => d._id == data.tipoResponsable
  )

  return {
    ...data,
    motivoDescripcion: motive?.description as string,

    // E504
    descripcionTipoResponsable: responsibleType?.description as string
  };
});

export type Remision = z.infer<typeof RemisionSchema>;