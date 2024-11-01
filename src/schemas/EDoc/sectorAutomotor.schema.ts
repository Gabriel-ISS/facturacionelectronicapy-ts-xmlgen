import { z } from 'zod';
import {
  enumToZodUnion,
  validateNumberLength,
} from '../../helpers/zod.helpers';
import { VehicleOperationType } from '../../constants/vehicleOperationTypes.constants';
import { FuelType } from '../../constants/fuelTypes.constants';
import dbService from '../../services/db.service';

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
        validateNumberLength({
          value,
          max: 4,
          fieldName: 'potencia',
          ctx,
        });
      }),

    // E776
    capacidadMotor: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        validateNumberLength({
          value,
          max: 4,
          fieldName: 'potencia',
          ctx,
        });
      }),

    // E785
    capacidadPasajeros: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        validateNumberLength({
          value,
          max: 3,
          fieldName: 'potencia',
          ctx,
        });
      }),

    // E777
    pesoNeto: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        validateNumberLength({
          value,
          max: 6,
          maxDecimals: 4,
          fieldName: 'potencia',
          ctx,
        });
      }),

    // E778
    pesoBruto: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        validateNumberLength({
          value,
          max: 6,
          maxDecimals: 4,
          fieldName: 'potencia',
          ctx,
        });
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
        validateNumberLength({
          value,
          max: 6,
          maxDecimals: 4,
          fieldName: 'potencia',
          ctx,
        });
      }),

    // E783
    año: z.number().optional().superRefine((value, ctx) => {
      if (value == undefined) return;
      if (value.toString().length != 4) {
        ctx.addIssue({
          path: ['año'],
          message: 'El año debe tener 4 caracteres',
          code: z.ZodIssueCode.custom,
        });
      }
    }),

    // E784
    tipoVehiculo: z.string().min(4).max(10).optional(),

    // E786
    cilindradas: z.string().length(4).optional(),
  })
  .transform((data, ctx) => {
    if (data.pesoNeto && data.pesoBruto && data.pesoNeto > data.pesoBruto) {
      ctx.addIssue({
        path: ['pesoNeto'],
        message: 'El peso neto no puede ser mayor que el peso bruto.',
        code: z.ZodIssueCode.custom,
      });
    }

    if (data.tipoCombustible == FuelType.OTRO) {
      if (!data.tipoCombustibleDescripcion) {
        ctx.addIssue({
          path: ['tipoCombustibleDescripcion'],
          message: 'Debe especificar la descripción del tipo de combustible',
          code: z.ZodIssueCode.custom,
        });
      }
    } else if (data.tipoCombustible) {
      const foundFuelType = dbService
        .select('fuelTypes')
        .findById(data.tipoCombustible);
      data.tipoCombustibleDescripcion = foundFuelType?.description;
    }

    return data;
  });

export type SectorAutomotor = z.infer<typeof SectorAutomotorSchema>;
