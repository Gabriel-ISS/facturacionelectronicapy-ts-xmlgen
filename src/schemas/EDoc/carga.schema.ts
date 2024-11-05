import { z } from 'zod';
import { CargoCharacteristic } from '../../constants/cargoCharacteristics.constants';
import { MeasurementUnit } from '../../constants/measurementUnits.constants';
import NumberLength from '../../helpers/validation/NumberLenght';
import {
  enumToZodUnion
} from '../../helpers/validation/enumConverter';
import dbService from '../../services/db.service';
import ZodValidator from '../../helpers/validation/ZodValidator';

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
    const validator = new ZodValidator(ctx, data)

    if (data.caracteristicaCarga == CargoCharacteristic.OTRO) {
      validator.requiredField('caracteristicaCargaDescripcion')
    } else if (data.caracteristicaCarga) {
      const foundCharacteristic = dbService
        .select('cargoCharacteristics')
        .findById(data.caracteristicaCarga);

      data.caracteristicaCargaDescripcion = foundCharacteristic?.description;
    }

    return data;
  });

export type Carga = z.infer<typeof CargaSchema>;
