import { z } from 'zod';
import { VehicleIdentification } from '../../constants/vehicleIdentifications.constants';
import { enumToZodUnion } from '../../helpers/zod.helpers';

export const VehiculoSchema = z
  .object({
    // E961: TODO: Debe ser acorde al atributo modalidad (E903)
    tipo: z.string(),
    // E962
    marca: z.string(),

    // E967
    documentoTipo: z.union(enumToZodUnion(VehicleIdentification)),

    // E963
    documentoNumero: z.string().optional(),

    // E964
    obs: z.string().optional(),

    // E965
    numeroMatricula: z.string().optional(),

    // E966
    numeroVuelo: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.documentoTipo ==
        VehicleIdentification.NUMERO_DE_IDENTIFICACION_DEL_VEHICULO &&
      !data.documentoNumero
    ) {
      ctx.addIssue({
        path: ['documentoNumero'],
        message: 'Especifique el numero de documento',
        code: z.ZodIssueCode.custom,
      });
    }

    if (
      data.documentoTipo ==
        VehicleIdentification.NUMERO_DE_MATRICULA_DEL_VEHICULO &&
      !data.numeroMatricula
    ) {
      ctx.addIssue({
        path: ['numeroMatricula'],
        message: 'Especifique el numero de matricula',
        code: z.ZodIssueCode.custom,
      });
    }
  });
export type Vehiculo = z.infer<typeof VehiculoSchema>;