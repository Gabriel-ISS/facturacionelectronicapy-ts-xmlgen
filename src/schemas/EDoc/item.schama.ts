import { z } from 'zod';
import { Country } from '../../constants/countries.constants';
import { MerchandiseRelevance } from '../../constants/merchandiseRelevances.constants';
import { TaxTreatment } from '../../constants/taxTreatments.constants';
import DateHelper from '../../helpers/DateHelper';
import NumberLength from '../../helpers/validation/NumberLenght';
import {
  enumToZodEnum,
  enumToZodUnion,
} from '../../helpers/validation/enumConverter';
import dbService from '../../services/db.service';
import { ItemDncpSchema } from './itemDncp.schema';
import { SectorAutomotorSchema } from './sectorAutomotor.schema';
import { TaxRate } from './taxRate.constants';
import ZodValidator from '../../helpers/validation/ZodValidator';

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
    partidaArancelaria: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).int().length(4);
      }),

    // E703
    ncm: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).int().min(6).max(8);
      }),

    // E708
    descripcion: z
      .string({
        required_error: 'La descripción es requerida',
      })
      .min(1)
      .max(120),

    // E709
    unidadMedida: z
      .number({
        required_error: 'La unidad de medida es requerida',
      })
      .superRefine((value, ctx) => {
        const foundUnit = dbService.select('measurementUnits').findById(value);
        if (!foundUnit) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Unidad de medida no encontrada',
            path: ctx.path,
          });
        }
      }),

    // E711
    cantidad: z
      .number({
        required_error: 'La cantidad es requerida',
      })
      .superRefine((value, ctx) => {
        new NumberLength(value, ctx).max(10).maxDecimals(4);
      }),

    // E714
    observacion: z.string().min(1).max(500).optional(),

    // E721
    precioUnitario: z.number().superRefine((value, ctx) => {
      new NumberLength(value, ctx).max(15).maxDecimals(8);
    }),

    // E725
    cambio: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).max(5).maxDecimals(4);
      }),

    // EA002
    descuento: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).max(15).maxDecimals(8);
      }),

    // EA006
    anticipo: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).max(15).maxDecimals(8);
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
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).max(10).maxDecimals(4);
      }),

    // E718
    toleranciaPorcentaje: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).max(3).maxDecimals(8);
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
    ivaBase: z.number().superRefine((value, ctx) => {
      if (value == undefined) return;
      new NumberLength(value, ctx).max(15).maxDecimals(8);
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
    registroEntidadComercial: z.string().length(20).optional(),

    // E761: TODO: OTRO DESAPARECIDO
    /* nombreProducto: z
      .string()
      .optional()
      .describe('Obligados por el Art. 1 de la RG N° 106/2021 – Agroquímicos'), */

    dncp: ItemDncpSchema.optional(),

    sectorAutomotor: SectorAutomotorSchema.optional(),
  })
  .transform((data, ctx) => {
    const validator = new ZodValidator(ctx, data);

    if (data.pais) {
      const foundCountry = dbService.select('countries').findById(data.pais);

      validator.validate('pais', !foundCountry, 'El pais no es válido');

      data.paisDescripcion = foundCountry?.description;
    }

    if (data.tolerancia) {
      validator.requiredField('toleranciaCantidad');
      validator.requiredField('toleranciaPorcentaje');
    }

    validator.validate(
      'iva',
      (data.ivaTipo == TaxTreatment.GRAVADO_IVA ||
        data.ivaTipo == TaxTreatment.GRAVADO_PARCIAL__GRAV__EXENTO_) &&
        data.iva != TaxRate.CINCO &&
        data.iva != TaxRate.DIEZ,
      'El IVA debe ser cinco o diez',
    );

    validator.validate(
      'iva',
      (data.ivaTipo == TaxTreatment.EXENTO ||
        data.ivaTipo == TaxTreatment.EXONERADO__ART__100___LEY_6380_2019_) &&
        data.iva != TaxRate.CERO,
      'El IVA debe ser cero',
    );

    return data;
  });
export type Item = z.infer<typeof ItemSchema>;
