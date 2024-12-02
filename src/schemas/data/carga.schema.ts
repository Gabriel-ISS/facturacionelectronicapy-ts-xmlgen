import { z } from 'zod';
import { CargoCharacteristic } from '../../data/cargoCharacteristics.table';
import { MeasurementUnit } from '../../data/measurementUnits.table';
import NumberLength from '../../helpers/validation/NumberLenght';
import dbService from '../../services/db.service';
import ZodValidator from '../../helpers/validation/ZodValidator';

/**G1. Campos generales de la carga (G050 - G099) */
export const CargaSchema = z
  .object({
    // G051
    unidadMedidaVolumenTotal: z
      .nativeEnum(MeasurementUnit)
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
    unidadMedidaPesoTotal: z.nativeEnum(MeasurementUnit).optional(),

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
      .nativeEnum(CargoCharacteristic)
      .optional(),

    // G058: OBS: OBLIGATORIO PARA KUDE
    caracteristicaCargaDescripcion: z.string().optional(),
  })
  .transform((data, ctx) => {
    const validator = new ZodValidator(ctx, data)

    /**G057 = 3 */
    const isCargoOther = data.caracteristicaCarga == CargoCharacteristic.OTRO;

    // G058 - caracteristicaCargaDescripcion
    {
      /*
      Si G057 = 3, informar la
      característica de la carga
      OBS: Obligatorio para
      KUDE
      */
     if (isCargoOther) {
      validator.requiredField('caracteristicaCargaDescripcion')
    } else if (data.caracteristicaCarga) {
      const foundCharacteristic = dbService
        .cargoCharacteristics
        ._findById(data.caracteristicaCarga);

      data.caracteristicaCargaDescripcion = foundCharacteristic?.description;
    }
    }

    return {
      ...data,

      // G052
      unidadMedidaVolumenDescripcion: dbService
        .measurementUnits
        ._findByIdIfExist(data.unidadMedidaVolumenTotal)?.description,

      // G055
      unidadMedidaPesoDescripcion: dbService
        .measurementUnits
        ._findByIdIfExist(data.unidadMedidaPesoTotal)?.description,
    };
  });

export type Carga = z.infer<typeof CargaSchema>;
