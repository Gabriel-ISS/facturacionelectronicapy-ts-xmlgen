import { z } from 'zod';
import { ItemDncpSchema } from './itemDncp.schema';
import { SectorAutomotorSchema } from './sectorAutomotor.schema';
import {
  enumToZodEnum,
  enumToZodUnion,
  validateNumberLength,
} from '../../helpers/zod.helpers';
import constantsService from '../../services/constants.service';
import dbService from '../../services/db.service';
import { Country } from '../../constants/countries.constants';
import { MerchandiseRelevance } from '../../constants/merchandiseRelevances.constants';
import { TaxTreatment } from '../../constants/taxTreatments.constants';
import { TaxRate } from './taxRate.constants';
import DateHelper from '../../helpers/DateHelper';

export const ItemSchema = z
  .object({
    // E701
    codigo: z
      .string({
        required_error: 'El código es requerido',
      })
      .min(1)
      .max(20, { message: 'El código no puede tener más de 20 caracteres' }),

    // E702
    partidaArancelaria: z.number().min(1000).max(9999).optional(),

    // E703
    ncm: z.number().min(100000).max(99999999).optional(),

    // E708
    descripcion: z
      .string({
        required_error: 'La descripción es requerida',
      })
      .min(1)
      .max(120),

    // E709: TODO: ver con mas cuidado
    unidadMedida: z
      .number({
        required_error: 'La unidad de medida es requerida',
      })
      .min(1)
      .max(99999),

    // E711
    cantidad: z
      .number({
        required_error: 'La cantidad es requerida',
      })
      .min(1)
      .max(9999999999),

    // E714
    observacion: z.string().min(1).max(500).optional(),

    // E721
    precioUnitario: z.number().superRefine((data, ctx) => {
      validateNumberLength({
        value: data,
        max: 15,
        maxDecimals: 8,
        ctx,
        fieldName: 'precioUnitario',
      });
    }),

    // E725
    cambio: z
      .number()
      .optional()
      .superRefine((data, ctx) => {
        if (data == undefined) return;

        validateNumberLength({
          value: data,
          max: 5,
          maxDecimals: 4,
          ctx,
          fieldName: 'cambio',
        });
      }),

    // EA002
    descuento: z
      .number()
      .optional()
      .superRefine((data, ctx) => {
        if (data == undefined) return;

        validateNumberLength({
          value: data,
          max: 15,
          maxDecimals: 8,
          ctx,
          fieldName: 'descuento',
        });
      }),

    // EA006
    anticipo: z
      .number()
      .optional()
      .superRefine((data, ctx) => {
        if (data == undefined) return;
        validateNumberLength({
          value: data,
          max: 15,
          maxDecimals: 8,
          ctx,
          fieldName: 'anticipo',
        });
      }),

    // E712
    pais: z.enum(enumToZodEnum<typeof Country, Country>(Country)).optional(),

    // E713
    paisDescripcion: z.string().optional(),

    // E715
    tolerancia: z.union(enumToZodUnion(MerchandiseRelevance)).optional(),

    // E717
    toleranciaCantidad: z
      .number()
      .optional()
      .superRefine((data, ctx) => {
        if (data == undefined) return;
        validateNumberLength({
          value: data,
          max: 10,
          maxDecimals: 4,
          ctx,
          fieldName: 'toleranciaCantidad',
        });
      }),

    // E718
    toleranciaPorcentaje: z
      .number()
      .optional()
      .superRefine((data, ctx) => {
        if (data == undefined) return;
        validateNumberLength({
          value: data,
          max: 3,
          maxDecimals: 8,
          ctx,
          fieldName: 'toleranciaPorcentaje',
        });
      }),

    // E719: TODO: A ARTIR DE AQUI VOLVER EN REVERSA PARA VERIFICAR LOS VALORES QUE DEPENDEN DE VALORES GLOBALES
    cdcAnticipo: z.string().length(44).optional(),

    // E731
    ivaTipo: z.union(enumToZodUnion(TaxTreatment), {
      required_error: 'El tipo de IVA es requerido',
    }),

    // E734
    iva: z.union(enumToZodUnion(TaxRate), {
      required_error: 'La tasa del IVA es requerida',
    }),

    // E735
    ivaBase: z.number().superRefine((data, ctx) => {
      if (data == undefined) return;
      validateNumberLength({
        value: data,
        max: 15,
        maxDecimals: 8,
        ctx,
        fieldName: 'ivaBase',
      });
    }),

    // E751
    lote: z
      .string()
      .min(1)
      .max(80, {
        message:
          'El número de lote debe tener una longitud máxima de 80 caracteres',
      })
      .optional()
      .describe('Número de Lote del producto'),

    // E752
    vencimiento: z.coerce
      .date()
      .optional()
      .transform((value) => {
        if (!value) return value;
        return DateHelper.getIsoDateString(value);
      }),

    // E753
    numeroSerie: z
      .string()
      .min(1)
      .max(10, {
        message:
          'El número de serie debe tener una longitud máxima de 10 caracteres',
      })
      .optional(),

    // E754
    numeroPedido: z.string().min(1).max(20).optional(),

    // E755
    numeroSeguimiento: z.string().min(1).max(20).optional(),

    // E759
    registroSenave: z.string().length(20).optional(),

    // E760
    registroEntidadComercial: z
      .string()
      .length(20)
      .optional(),


    // E761: TODO: OTRO DESAPARECIDO
    /* nombreProducto: z
      .string()
      .optional()
      .describe('Obligados por el Art. 1 de la RG N° 106/2021 – Agroquímicos'), */

    // E762: ES BROMA? EL MANUAL SOLO LO MENCIONA EN UNA OBSERVACIÓN
    dncp: ItemDncpSchema.optional(),

    sectorAutomotor: SectorAutomotorSchema.optional(),
  })
  .transform((data, ctx) => {
    if (data.pais) {
      const foundCountry = dbService.select('countries').findById(data.pais);

      data.paisDescripcion = foundCountry?.description;

      if (!foundCountry) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'El pais no es válido',
          path: ['pais'],
        });
      }
    }

    if (data.tolerancia) {
      if (!data.toleranciaCantidad) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Debe indicar la cantidad de quiebra o merma',
          path: ['toleranciaCantidad'],
        });
      }

      if (!data.toleranciaPorcentaje) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Debe indicar el porcentaje de quiebra o merma',
          path: ['toleranciaPorcentaje'],
        });
      }
    }

    if (
      (data.ivaTipo == TaxTreatment.GRAVADO_IVA ||
        data.ivaTipo == TaxTreatment.GRAVADO_PARCIAL__GRAV__EXENTO_) &&
      data.iva != TaxRate.CINCO &&
      data.iva != TaxRate.DIEZ
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'El IVA debe ser cinco o diez',
        path: ['iva'],
      });
    }

    if (
      (data.ivaTipo == TaxTreatment.EXENTO ||
        data.ivaTipo == TaxTreatment.EXONERADO__ART__100___LEY_6380_2019_) &&
      data.iva != TaxRate.CERO
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'El IVA debe ser cero',
        path: ['iva'],
      });
    }

    return data;
  });
export type Item = z.infer<typeof ItemSchema>;
