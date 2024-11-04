import { z } from 'zod';
import { CargoCharacteristic } from '../../constants/cargoCharacteristics.constants';
import { MeasurementUnit } from '../../constants/measurementUnits.constants';
import NumberLength from '../../helpers/validation/NumberLenght';
import {
  enumToZodUnion
} from '../../helpers/validation/Common';
import dbService from '../../services/db.service';

export const CargaSchema = z
  .object({
    // G051
    unidadMedidaVolumenTotal: z
      .union(enumToZodUnion(MeasurementUnit))
      .optional(),

    // G053
    volumenTotal: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).max(20);
      }),

    // G054
    unidadMedidaPesoTotal: z.union(enumToZodUnion(MeasurementUnit)).optional(),

    // G056
    pesoTotal: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).max(20);
      }),

    // G057
    caracteristicaCarga: z
      .union(enumToZodUnion(CargoCharacteristic))
      .optional(),

    // G058:  TODO: OBLIGATORIO PARA KUDE
    caracteristicaCargaDescripcion: z.string().optional(),
  })
  .transform((data, ctx) => {
    if (data.caracteristicaCarga == CargoCharacteristic.OTRO) {
      if (!data.caracteristicaCargaDescripcion) {
        ctx.addIssue({
          path: ['caracteristicaCargaDescripcion'],
          code: z.ZodIssueCode.custom,
          message:
            'Debe especificar la descripción de la característica de carga',
        });
      }
    } else if (data.caracteristicaCarga) {
      const foundCharacteristic = dbService
        .select('cargoCharacteristics')
        .findById(data.caracteristicaCarga);

      data.caracteristicaCargaDescripcion = foundCharacteristic?.description;
    }

    return data;
  });

export type Carga = z.infer<typeof CargaSchema>;
