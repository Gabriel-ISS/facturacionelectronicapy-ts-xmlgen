import { z } from 'zod';
import { validateNumberLength } from '../../helpers/zod.helpers';
import DateHelper from '../../helpers/DateHelper';

export const SectorSegurosSchema = z.object({
  // E801
  codigoAseguradora: z.string().length(20).optional(),

  // EA791
  codigoPoliza: z.string().min(1).max(20),

  // EA794
  numeroPoliza: z.string().min(1).max(25),

  // EA792
  vigencia: z.string().min(3).max(15),

  // EA793
  vigenciaUnidad: z.number().superRefine((data, ctx) => {
    if (data == undefined) return;
    validateNumberLength({
      value: data,
      fieldName: 'vigenciaUnidad',
      decimalsLength: 1,
      max: 5,
      ctx,
    })
  }),

  // EA795
  inicioVigencia: z.coerce.date().optional().transform(value => {
    if(value == undefined) return value
    return DateHelper.getISODateTimeString(value);
  }),

  // EA796
  finVigencia: z.coerce.date().optional().transform(value => {
    if(value == undefined) return value
    return DateHelper.getISODateTimeString(value);
  }),

  // EA797
  codigoInternoItem: z.string().min(3).max(20).optional(),
});

export type SectorSeguros = z.infer<typeof SectorSegurosSchema>;