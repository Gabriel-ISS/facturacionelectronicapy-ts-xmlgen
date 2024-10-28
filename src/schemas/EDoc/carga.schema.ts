import { z } from 'zod';
import { CargoCharacteristic } from '../../constants/cargoCharacteristics.constants';
import { MeasurementUnit } from '../../constants/measurementUnits.constants';
import { enumToZodUnion } from '../../helpers/zod.helpers';

export const CargaSchema = z
  .object({
    // G051
    unidadMedidaVolumenTotal: z
      .union(enumToZodUnion(MeasurementUnit))
      .optional(),

    // G053
    volumenTotal: z.number().optional(),

    // G054
    unidadMedidaPesoTotal: z.union(enumToZodUnion(MeasurementUnit)).optional(),

    // G056
    pesoTotal: z.number().optional(),

    // G057
    caracteristicaCarga: z
      .union(enumToZodUnion(CargoCharacteristic))
      .optional(),

    // G058
    caracteristicaCargaDescripcion: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.caracteristicaCarga == CargoCharacteristic.OTRO &&
      !data.caracteristicaCargaDescripcion
    ) {
      ctx.addIssue({
        path: ['caracteristicaCargaDescripcion'],
        code: z.ZodIssueCode.custom,
        message:
          'Debe especificar la descripción de la característica de carga',
      });
    }
  });
export type Carga = z.infer<typeof CargaSchema>;