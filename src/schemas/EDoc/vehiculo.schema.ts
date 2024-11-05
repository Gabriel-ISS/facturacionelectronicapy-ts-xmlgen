import { z } from 'zod';
import { VehicleIdentification } from '../../constants/vehicleIdentifications.constants';
import { enumToZodUnion } from '../../helpers/validation/enumConverter';
import ZodValidator from '../../helpers/validation/ZodValidator';

/**E10.3. Campos que identifican el vehículo de traslado de mercaderías (E960-E979) */
export const VehiculoSchema = z
  .object({
    // E961: Debe ser acorde al atributo modalidad (E903)
    tipo: z.string().min(4).max(10),

    // E962
    marca: z.string().min(1).max(10),

    // E963
    documentoNumero: z.string().min(1).max(20).optional(),

    // E964
    obs: z.string().min(1).max(20).optional(),

    // E965
    numeroMatricula: z.string().length(6).optional(),

    // E966
    numeroVuelo: z.string().optional(),

    // E967
    documentoTipo: z.union(enumToZodUnion(VehicleIdentification)),
  })
  .superRefine((data, ctx) => {
    const validator = new ZodValidator(ctx, data);

    if (
      data.documentoTipo ==
      VehicleIdentification.NUMERO_DE_IDENTIFICACION_DEL_VEHICULO
    ) {
      validator.requiredField('documentoNumero');
    }

    if (
      data.documentoTipo ==
      VehicleIdentification.NUMERO_DE_MATRICULA_DEL_VEHICULO
    ) {
      validator.requiredField('numeroMatricula');
    }
  });

export type Vehiculo = z.infer<typeof VehiculoSchema>;
