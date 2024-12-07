import { z } from 'zod';
import { ActividadEconomicaSchema } from './params/actividadEconomica.schema';
import { EstablecimientoSchema } from './params/establecimiento.schema';
import CommonValidators from '../helpers/validation/CommonValidators';

import { RegimeType } from '../data/regimeTypes.table';
import { TaxpayerType } from '../data/taxpayerTypes.table';
import SDParser from '../helpers/SDParser';

export const EDocParamsSchema = z
  .object({
    // D2. Campos que identifican al emisor del Documento Electrónico DE (D100-D129)

    // ruc con dv, para calcular D101 y D102
    ruc: CommonValidators.ruc().describe(SDParser.stringify('D101 - D102')),

    // D103
    tipoContribuyente: z
      .nativeEnum(TaxpayerType)
      .describe(SDParser.stringify('D103', { e: 'TaxpayerType' })),

    // D104
    tipoRegimen: z
      .nativeEnum(RegimeType)
      .optional()
      .describe(SDParser.stringify('D104', { e: 'RegimeType' })),

    // D105
    razonSocial: CommonValidators.legalName().describe(
      SDParser.stringify('D105'),
    ),

    // D106
    nombreFantasia: CommonValidators.tradeName()
      .optional()
      .describe(SDParser.stringify('D106')),

    // D107 - D119
    establecimientos: z
      .array(EstablecimientoSchema)
      .min(1)
      .describe(SDParser.stringify('D107 - D119')),

    // D2.1 Campos que describen la actividad económica del emisor (D130-D139)
    actividadesEconomicas: z
      .array(ActividadEconomicaSchema)
      .min(1)
      .max(9)
      .describe(
        SDParser.stringify('D2.1', {
          d: 'Campos que describen la actividad económica del emisor (D130-D139)',
          v: 'https://servicios.set.gov.py/eset-publico/consultarActividadEconomicaIService.do',
        }),
      ),

    // C004
    timbradoNumero: CommonValidators.timbrado().describe(
      SDParser.stringify('C004'),
    ),

    // C008
    timbradoFecha: CommonValidators.isoDate().describe(
      SDParser.stringify('C008'),
    ),
  })
  .transform((data, ctx) => {
    const [rucID, rucDV] = data.ruc.split('-');

    return {
      ...data,

      // AA. Campos que identifican el formato electrónico XML (AA001-AA009)

      // AA002
      version: 150,

      // D101
      rucID,

      // D102
      rucDV,
    };
  });

export type EDocParamsInput = z.input<typeof EDocParamsSchema>;
