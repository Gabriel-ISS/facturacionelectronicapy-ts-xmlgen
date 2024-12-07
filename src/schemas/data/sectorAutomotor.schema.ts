import { z } from 'zod';
import { FuelType } from '../../data/fuelTypes.table';
import { VehicleOperationType } from '../../data/vehicleOperationTypes.table';
import NumberLength from '../../helpers/validation/NumberLenght';

import dbService from '../../services/db.service';
import ZodValidator from '../../helpers/validation/ZodValidator';
import { Path } from '../../helpers/Path';
import SDParser from '../../helpers/SDParser';

/**E8.5. Sector de automotores nuevos y usados (E770-E789) */
export const SectorAutomotorSchema = z
  .object({
    // E771
    tipo: z
      .nativeEnum(VehicleOperationType)
      .optional()
      .describe(SDParser.stringify('E771', { e: 'VehicleOperationType' })),

    // E773
    chasis: z
      .string()
      .length(17)
      .optional()
      .describe(SDParser.stringify('E773')),

    // E774
    color: z
      .string()
      .min(1)
      .max(10)
      .optional()
      .describe(SDParser.stringify('E774')),

    // E775
    potencia: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).int().max(4);
      })
      .describe(SDParser.stringify('E775')),

    // E776
    capacidadMotor: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).int().max(4);
      })
      .describe(SDParser.stringify('E776')),

    // E777
    pesoNeto: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).max(6).maxDecimals(4);
      })
      .describe(SDParser.stringify('E777')),

    // E778
    pesoBruto: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).max(6).maxDecimals(4);
      })
      .describe(SDParser.stringify('E778')),

    // E779
    tipoCombustible: z
      .nativeEnum(FuelType)
      .optional()
      .describe(SDParser.stringify('E779', { e: 'FuelType' })),

    // E780
    tipoCombustibleDescripcion: z
      .string()
      .min(3)
      .max(20)
      .optional()
      .describe(SDParser.stringify('E780')),

    // E781
    numeroMotor: z
      .string()
      .min(1)
      .max(21)
      .optional()
      .describe(SDParser.stringify('E781')),

    // E782
    // Capacidad máxima de tracción
    capacidadTraccion: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).max(6).maxDecimals(4);
      })
      .describe(SDParser.stringify('E782')),

    // E783
    año: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).int().length(4);
      })
      .describe(SDParser.stringify('E783')),

    // E784
    tipoVehiculo: z
      .string()
      .min(4)
      .max(10)
      .optional()
      .describe(SDParser.stringify('E784')),

    // E785
    capacidadPasajeros: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).int().max(3);
      })
      .describe(SDParser.stringify('E785')),

    // E786
    cilindradas: z
      .string()
      .length(4)
      .optional()
      .describe(SDParser.stringify('E786')),
  })
  .transform((data, ctx) => {
    type Data = typeof data;
    const validator = new ZodValidator(ctx, data);

    /**E769 = 9 */
    const isOtherFuelType = data.tipoCombustible == FuelType.OTRO;

    // E780 - tipoCombustibleDescripcion
    {
      /*
      Si E769 = 9 describir el tipo de
      combustible
      */
      if (data.tipoCombustible) {
        if (isOtherFuelType) {
          validator.requiredField('tipoCombustibleDescripcion');
        } else if (data.tipoCombustible) {
          const foundFuelType = dbService.fuelTypes._findById(
            data.tipoCombustible,
          );
          data.tipoCombustibleDescripcion = foundFuelType.description;
        }
      }
    }

    // ⚠️ esto no es del manual
    const pesoBrutoPath = new Path<Data>('pesoBruto');
    validator.validate(
      'pesoNeto',
      Boolean(
        data.pesoNeto && data.pesoBruto && data.pesoNeto > data.pesoBruto,
      ),
      `$path no puede ser mayor que '${pesoBrutoPath}'`,
    );

    return {
      ...data,

      // E772
      tipoDescripcion: dbService.vehicleOperationTypes._findByIdIfExist(
        data.tipo,
      )?.description,
    };
  });

export type SectorAutomotor = z.infer<typeof SectorAutomotorSchema>;
