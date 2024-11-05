import { z } from 'zod';
import { FuelType } from '../../constants/fuelTypes.constants';
import { VehicleOperationType } from '../../constants/vehicleOperationTypes.constants';
import NumberLength from '../../helpers/validation/NumberLenght';
import { enumToZodUnion } from '../../helpers/validation/enumConverter';
import dbService from '../../services/db.service';
import ZodValidator from '../../helpers/validation/ZodValidator';

export const SectorAutomotorSchema = z
  .object({
    // E771
    tipo: z.union(enumToZodUnion(VehicleOperationType)).optional(),

    // E773
    chasis: z.string().length(17).optional(),

    // E774
    color: z.string().min(1).max(10).optional(),

    // E775
    potencia: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).int().max(4);
      }),

    // E776
    capacidadMotor: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).int().max(4);
      }),

    // E785
    capacidadPasajeros: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).int().max(3);
      }),

    // E777
    pesoNeto: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).max(6).maxDecimals(4);
      }),

    // E778
    pesoBruto: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).max(6).maxDecimals(4);
      }),

    // E779
    tipoCombustible: z.union(enumToZodUnion(FuelType)).optional(),

    // E780: TODO: ESTE CAMPO ESTA UN POCO RARO
    // ASUMO QUE CONFUNDIO EL CAMPO E779 CON EL DE E770
    tipoCombustibleDescripcion: z.string().min(3).max(20).optional(),

    // E781
    numeroMotor: z.string().min(1).max(21).optional(),

    // E782
    // Capacidad máxima de tracción
    capacidadTraccion: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).max(6).maxDecimals(4);
      }),

    // E783
    año: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).int().length(4);
      }),

    // E784
    tipoVehiculo: z.string().min(4).max(10).optional(),

    // E786
    cilindradas: z.string().length(4).optional(),
  })
  .transform((data, ctx) => {
    const validator = new ZodValidator(ctx, data);

    validator.validate(
      'pesoNeto',
      Boolean(
        data.pesoNeto && data.pesoBruto && data.pesoNeto > data.pesoBruto,
      ),
      'El peso neto no puede ser mayor que el peso bruto.',
    );

    if (data.tipoCombustible == FuelType.OTRO) {
      validator.requiredField('tipoCombustibleDescripcion')
    } else if (data.tipoCombustible) {
      const foundFuelType = dbService
        .select('fuelTypes')
        .findById(data.tipoCombustible);
      data.tipoCombustibleDescripcion = foundFuelType?.description;
    }

    return data;
  });

export type SectorAutomotor = z.infer<typeof SectorAutomotorSchema>;
