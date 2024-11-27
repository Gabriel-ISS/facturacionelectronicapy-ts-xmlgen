import { z } from 'zod';
import { MerchandiseRelevance } from '../../constants/merchandiseRelevances.constants';
import DateHelper from '../../helpers/DateHelper';
import CommonValidators from '../../helpers/validation/CommonValidators';
import NumberLength from '../../helpers/validation/NumberLenght';
import ZodValidator from '../../helpers/validation/ZodValidator';
import dbService from '../../services/db.service';
import { CompleteImpuesto, ImpuestoSchema } from './impuesto.schema';
import { ItemDncpSchema } from './itemDncp.schema';
import { CompleteMonto, MontoSchema } from './monto.schema';
import { SectorAutomotorSchema } from './sectorAutomotor.schema';
import { MeasurementUnit } from '../../constants/measurementUnits.constants';

/**E8. Campos que describen los ítems de la operación (E700-E899) */
export const ItemSchema = z
  .object({
    // E701
    // VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_009_MT_V150.pdf/c268a447-11e3-ee1e-b4d5-8d83dd408401?t=1687353746900
    codigo: z
      .string()
      .min(1)
      .max(50, { message: 'El código no puede tener más de 20 caracteres' }),

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
    // VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_009_MT_V150.pdf/c268a447-11e3-ee1e-b4d5-8d83dd408401?t=1687353746900
    descripcion: z.string().min(1).max(2000),

    // E709
    unidadMedida: z.nativeEnum(MeasurementUnit),

    // E711: VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_023_MT_V150.pdf/9580922b-5dd5-60f9-4857-ae66a757898f?t=1724956850006
    cantidad: z.number().superRefine((value, ctx) => {
      new NumberLength(value, ctx).max(10).maxDecimals(8);
    }),

    // E712
    pais: CommonValidators.country().optional(),

    // E714
    observacion: z.string().min(1).max(500).optional(),

    // E715
    tolerancia: z.nativeEnum(MerchandiseRelevance).optional(),

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
    monto: MontoSchema.optional(),

    // E8.2. Campos que describen el IVA de la operación por ítem (E730-E739)
    impuesto: ImpuestoSchema.optional(),

    // E8.4. Grupo de rastreo de la mercadería (E750-E761)

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
        return DateHelper.getIsoDate(value);
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

    // E756, E757 y E758 (eliminados)
    // VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_010_MT_V150.pdf/d64a693b-6c63-86e1-ec6a-d4fe5ec4eeea?t=1687353747196

    // E759
    registroSenave: z.string().length(20).optional(),

    // E760
    registroEntidadComercial: z.string().length(20).optional(),

    // E761
    // VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_010_MT_V150.pdf/d64a693b-6c63-86e1-ec6a-d4fe5ec4eeea?t=1687353747196
    nombreProducto: z.string().min(1).max(30).optional(),

    // E8.5. Sector de automotores nuevos y usados (E770-E789)
    sectorAutomotor: SectorAutomotorSchema.optional(),
  })
  .transform((data, ctx) => {
    const validator = new ZodValidator(ctx, data);

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

    let monto;
    if (data.monto) {
      monto = {
        ...data.monto,

        // E727
        precioTotal: data.monto.precioUnitario * data.cantidad,
      };
    }

    return {
      ...data,

      // E713
      paisDescripcion: dbService
        .select('countries')
        .findByIdIfExist(data.pais, {
          ctx,
          fieldName: 'pais',
        })?.description,

      // E710
      unidadMedidaDescripcion: dbService
        .select('measurementUnits')
        .findById(data.unidadMedida, {
          ctx,
          fieldName: 'unidadMedida',
        }).description,

      // E716
      toleranciaDescripcion: dbService
        .select('merchandiseRelevances')
        .findByIdIfExist(data.tolerancia)?.description,

      monto,
    };
  });

export type Item = z.infer<typeof ItemSchema>;
export type CompleteItem = Item & {
  // E8.1. Campos que describen el precio, tipo de cambio y valor total de la operación por ítem (E720-E729)
  monto?: CompleteMonto;

  // E8.2. Campos que describen el IVA de la operación por ítem (E730-E739)
  impuesto?: CompleteImpuesto;
};
