import { z } from 'zod';
import { ActividadEconomicaSchema } from './params/actividadEconomica.schema';
import { EstablecimientoSchema } from './params/establecimiento.schema';
import CommonValidators from '../helpers/validation/CommonValidators';
import { enumToZodUnion } from '../helpers/validation/enumConverter';
import { RegimeType } from '../constants/regimeTypes.constants';

export const EDocParamsSchema = z.object({
  // AA. Campos que identifican el formato electrónico XML (AA001-AA009)

  // AA002
  version: z.literal(150).default(150),

  // D2. Campos que identifican al emisor del Documento Electrónico DE (D100-D129)

  // ruc con dv, para calcular D101 y D102
  ruc: CommonValidators.ruc(),

  // D103
  tipoContribuyente: CommonValidators.taxpayer(),

  // D104
  tipoRegimen: z.union(enumToZodUnion(RegimeType)).optional(),

  // D105
  razonSocial: CommonValidators.legalName(),

  // D106
  nombreFantasia: CommonValidators.tradeName().optional(),

  // D107 - D119
  establecimientos: z.array(EstablecimientoSchema),

  // D2.1 Campos que describen la actividad económica del emisor (D130-D139)
  actividadesEconomicas: z.array(ActividadEconomicaSchema).min(1).max(9),

  // C004
  timbradoNumero: z.string().length(8),

  // C008
  timbradoFecha: CommonValidators.isoDate(),
}).transform((data, ctx) => {

  const [rucID, rucDV] = data.ruc.split('-');

  return {
    ...data,

    // D101
    rucID,

    // D102
    rucDV,
    
  };
});

export type EDocParamsInput = z.input<typeof EDocParamsSchema>;
