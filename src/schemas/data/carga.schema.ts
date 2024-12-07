import { z } from 'zod';
import { CargoCharacteristic } from '../../data/cargoCharacteristics.table';
import { MeasurementUnit } from '../../data/measurementUnits.table';
import NumberLength from '../../helpers/validation/NumberLenght';
import dbService from '../../services/db.service';
import ZodValidator from '../../helpers/validation/ZodValidator';
import SDParser from '../../helpers/SDParser';

/**G1. Campos generales de la carga (G050 - G099) */
export const CargaSchema = z
  .object({
    // G051
    unidadMedidaVolumenTotal: z
      .nativeEnum(MeasurementUnit)
      .optional()
      .describe(SDParser.stringify('G051', { e: 'MeasurementUnit' })),

    // G053
    volumenTotal: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).max(20);
      })
      .describe(SDParser.stringify('G053')),

    // G054
    unidadMedidaPesoTotal: z
      .nativeEnum(MeasurementUnit)
      .optional()
      .describe(SDParser.stringify('G054', { e: 'MeasurementUnit' })),

    // G056
    pesoTotal: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).max(20);
      })
      .describe(SDParser.stringify('G056')),

    // G057
    caracteristicaCarga: z
      .nativeEnum(CargoCharacteristic)
      .optional()
      .describe(SDParser.stringify('G057', { e: 'CargoCharacteristic' })),

    // G058: OBS: OBLIGATORIO PARA KUDE
    caracteristicaCargaDescripcion: z
      .string()
      .optional()
      .describe(
        SDParser.stringify('G058', {
          d: 'Obligatorio para KUDE. Se establece automáticamente si la opción no es OTRO.',
        }),
      ),
  })
  .transform((data, ctx) => {
    const validator = new ZodValidator(ctx, data);

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
        validator.requiredField('caracteristicaCargaDescripcion');
      } else if (data.caracteristicaCarga) {
        const foundCharacteristic = dbService.cargoCharacteristics._findById(
          data.caracteristicaCarga,
        );

        data.caracteristicaCargaDescripcion = foundCharacteristic?.description;
      }
    }

    return {
      ...data,

      // G052
      unidadMedidaVolumenDescripcion:
        dbService.measurementUnits._findByIdIfExist(
          data.unidadMedidaVolumenTotal,
        )?.description,

      // G055
      unidadMedidaPesoDescripcion: dbService.measurementUnits._findByIdIfExist(
        data.unidadMedidaPesoTotal,
      )?.description,
    };
  });

export type Carga = z.infer<typeof CargaSchema>;
