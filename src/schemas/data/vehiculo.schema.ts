import { z } from 'zod';
import { VehicleIdentification } from '../../data/vehicleIdentifications.table';

import ZodValidator from '../../helpers/validation/ZodValidator';
import SDParser from '../../helpers/SDParser';

/**E10.3. Campos que identifican el vehículo de traslado de mercaderías (E960-E979) */
export const VehiculoSchema = z
  .object({
    // E961: Debe ser acorde al atributo modalidad (E903)
    tipo: z
      .string()
      .min(4)
      .max(10)
      .describe(
        SDParser.stringify('E961', {
          d: 'Debe ser acorde al atributo modalidad (E903)',
        }),
      ),

    // E962
    marca: z.string().min(1).max(10).describe(SDParser.stringify('E962')),

    // E963
    documentoNumero: z
      .string()
      .min(1)
      .max(20)
      .optional()
      .describe(SDParser.stringify('E963')),

    // E964
    obs: z
      .string()
      .min(1)
      .max(20)
      .optional()
      .describe(SDParser.stringify('E964')),

    // E965
    // VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_005_MT_V150.pdf/098e75de-e878-7bcd-49ec-55c33a45a0a7?t=1687353746324
    numeroMatricula: z
      .string()
      .min(6)
      .max(7)
      .optional()
      .describe(SDParser.stringify('E965')),

    // E966
    numeroVuelo: z.string().optional().describe(SDParser.stringify('E966')),

    // E967
    documentoTipo: z
      .nativeEnum(VehicleIdentification)
      .describe(SDParser.stringify('E967', { e: 'VehicleIdentification' })),
  })
  .superRefine((data, ctx) => {
    const validator = new ZodValidator(ctx, data);

    /**E967 = 1 */
    const docTypeIsIdentificationNumber =
      data.documentoTipo ==
      VehicleIdentification.NUMERO_DE_IDENTIFICACION_DEL_VEHICULO;
    /**E967 = 2 */
    const docTypeIsMatricula =
      data.documentoTipo ==
      VehicleIdentification.NUMERO_DE_MATRICULA_DEL_VEHICULO;

    // E963 - documentoNumero
    {
      /*
      Debe informarse cuando el E967=1
      */

      if (docTypeIsIdentificationNumber) {
        validator.requiredField('documentoNumero');
      }
    }

    // E965 - numeroMatricula
    {
      /*
      Debe informarse cuando el E967=2
      */

      if (docTypeIsMatricula) {
        validator.requiredField('numeroMatricula');
      }
    }
  });

export type Vehiculo = z.infer<typeof VehiculoSchema>;
