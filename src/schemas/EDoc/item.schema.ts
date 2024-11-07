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
import { TaxRate } from '../../constants/taxRate.constants';
import ZodValidator from '../../helpers/validation/ZodValidator';

/**E8. Campos que describen los ítems de la operación (E700-E899) */
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

    // E704 - E707
    dncp: ItemDncpSchema.optional(),

    // E708
    descripcion: z
      .string({
        required_error: 'La descripción es requerida',
      })
      .min(1)
      .max(120),

    // E709
    unidadMedida: z.number({
      required_error: 'La unidad de medida es requerida',
    }),

    // E711
    cantidad: z
      .number({
        required_error: 'La cantidad es requerida',
      })
      .superRefine((value, ctx) => {
        new NumberLength(value, ctx).max(10).maxDecimals(4);
      }),

    // E712
    pais: z.enum(enumToZodEnum<typeof Country, Country>(Country)).optional(),

    // E714
    observacion: z.string().min(1).max(500).optional(),

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

    // E719
    cdcAnticipo: z.string().length(44).optional(),

    // E8.1. Campos que describen el precio, tipo de cambio y valor total de la operación por ítem (E720-E729)

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

    // E8.1.1 Campos que describen los descuentos, anticipos y valor total por ítem (EA001-EA050)

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

    // E8.2. Campos que describen el IVA de la operación por ítem (E730-E739)

    // E731
    ivaTipo: z.union(enumToZodUnion(TaxTreatment), {
      required_error: 'El tipo de IVA es requerido',
    }),

    // E733
    proporcionGravada: z.number().min(0).max(100).optional(),

    // E734
    iva: z.union(enumToZodUnion(TaxRate), {
      required_error: 'La tasa del IVA es requerida',
    }),

    // E8.4. Grupo de rastreo de la mercadería (E750-E760)

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

    // E756: TODO

    // E757: TODO

    // E758: TODO

    // E759
    registroSenave: z.string().length(20).optional(),

    // E760
    registroEntidadComercial: z.string().length(20).optional(),

    // E761: TODO: NO APARECE EN EL MANUAL
    /* nombreProducto: z
      .string()
      .optional()
      .describe('Obligados por el Art. 1 de la RG N° 106/2021 – Agroquímicos'), */

    // E8.5. Sector de automotores nuevos y usados (E770-E789)
    sectorAutomotor: SectorAutomotorSchema.optional(),
  })
  .transform((data, ctx) => {
    const validator = new ZodValidator(ctx, data);

    /**E731 = 1 */
    const isIvaGravado = data.ivaTipo == TaxTreatment.GRAVADO_IVA;
    /**E731 = 2 */
    const isIvaExonerado =
      data.ivaTipo == TaxTreatment.EXONERADO__ART__100___LEY_6380_2019_;
    /**E731 = 3 */
    const isIvaExento = data.ivaTipo == TaxTreatment.EXENTO;
    /**E731 = 4 */
    const isIvaGravadoParcial =
      data.ivaTipo == TaxTreatment.GRAVADO_PARCIAL__GRAV__EXENTO_;
    /**E734 = 0 */
    const taxRateIs0 = data.iva == TaxRate.CERO;
    /**E734 = 5 */
    const taxRateIs5 = data.iva == TaxRate.CINCO;
    /**E734 = 10 */
    const taxRateIs10 = data.iva == TaxRate.DIEZ;

    // E717 - toleranciaCantidad
    {
      /*
      Obligatorio si se informa E715 
      */
      if (data.tolerancia) {
        validator.requiredField('toleranciaCantidad');
      }
    }

    // E718 - toleranciaPorcentaje
    {
      /*
      Obligatorio si se informa E715 
      */
      if (data.tolerancia) {
        validator.requiredField('toleranciaPorcentaje');
      }
    }

    // E733 - proporcionGravada
    {
      // ⚠️ esto no es del manual
      if (data.proporcionGravada != undefined) {
        if (isIvaGravado) {
          validator.validate(
            'proporcionGravada',
            data.proporcionGravada != 100,
            'La proporcion gravada deve ser de 100% para el tipo de IVA gravado',
          );
        } else if (isIvaExonerado || isIvaExento) {
          validator.validate(
            'proporcionGravada',
            data.proporcionGravada != 0,
            'La proporcion gravada debe ser de 0% para el tipo de IVA exonerado o exento',
          );
        }
      } else {
        if (isIvaGravado) {
          data.proporcionGravada = 100;
        } else if (isIvaExonerado || isIvaExento) {
          data.proporcionGravada = 0;
        } else if (isIvaGravadoParcial) {
          validator.requiredField(
            'proporcionGravada',
            'Si el tipo de IVA es parcial, la proporcion gravada es requerida',
          );
        }
      }
    }

    // E734 - iva
    {
      /*
      0 (para E731 = 2 o 3)
      5 (para E731 = 1 o 4)
      10 (para E731 = 1 o 4)
      */

      validator.validate(
        'iva',
        (isIvaGravado || isIvaGravadoParcial) && !(taxRateIs5 || taxRateIs10),
        'El IVA debe ser cinco o diez',
      );

      validator.validate(
        'iva',
        (isIvaExonerado || isIvaExento) && !taxRateIs0,
        'El IVA debe ser cero',
      );
    }

    return {
      ...data,
      proporcionGravada: data.proporcionGravada as number,
      
      // E713
      paisDescripcion: dbService
        .select('countries')
        .findByIdIfExist(data.pais, {
          ctx,
          fieldName: 'pais',
          message: 'El pais no es válido',
        }),

      // E710
      unidadMedidaDescripcion: dbService
        .select('measurementUnits')
        .findById(data.unidadMedida, {
          ctx,
          fieldName: 'unidadMedida',
          message: 'Unidad de medida no encontrada',
        }),

      // E716
      toleranciaDescripcion: dbService
        .select('merchandiseRelevances')
        .findByIdIfExist(data.tolerancia),

      // E727
      precioTotal: data.precioUnitario * data.cantidad,

      // EA003: TODO: PREGUNTAR A LA DNIT SI ESTO ES UN ERROR DEL MANUAL
      // DEBERÍA DIVIDIRSE POR LA CANTIDAD
      procentajeDescuentoPorItem:
        data.descuento && data.descuento > 0
          ? (data.descuento * 100) / data.precioUnitario
          : undefined,

      // EA004 y EA007 se declaran en EDocSchema
      // EA008, EA009, E735 y E736 se calculan en EDocSchema

      // E732
      ivaTipoDescripcion: dbService
        .select('taxTreatments')
        .findById(data.ivaTipo).description,
    };
  });
export type Item = z.infer<typeof ItemSchema>;
