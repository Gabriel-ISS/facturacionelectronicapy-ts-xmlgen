import { z } from 'zod';
import { MerchandiseRelevance } from '../../data/merchandiseRelevances.table';
import DateHelper from '../../helpers/DateHelper';
import CommonValidators from '../../helpers/validation/CommonValidators';
import NumberLength from '../../helpers/validation/NumberLenght';
import ZodValidator from '../../helpers/validation/ZodValidator';
import dbService from '../../services/db.service';
import { CompleteImpuesto, ImpuestoSchema } from './impuesto.schema';
import { ItemDncpSchema } from './itemDncp.schema';
import { CompleteMonto, MontoSchema } from './monto.schema';
import { SectorAutomotorSchema } from './sectorAutomotor.schema';
import { MeasurementUnit } from '../../data/measurementUnits.table';
import SDParser from '../../helpers/SDParser';

/**E8. Campos que describen los ítems de la operación (E700-E899) */
export const ItemSchema = z
  .object({
    // E701
    // VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_009_MT_V150.pdf/c268a447-11e3-ee1e-b4d5-8d83dd408401?t=1687353746900
    codigo: z
      .string()
      .min(1)
      .max(50)
      .describe(
        SDParser.stringify('E701', {
          v: 'https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_009_MT_V150.pdf/c268a447-11e3-ee1e-b4d5-8d83dd408401?t=1687353746900',
        }),
      ),

    // E702
    partidaArancelaria: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).int().length(4);
      })
      .describe(SDParser.stringify('E702')),

    // E703
    ncm: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).int().min(6).max(8);
      })
      .describe(SDParser.stringify('E703')),

    // E704 - E707
    dncp: ItemDncpSchema.optional().describe(SDParser.stringify('E704-E707')),

    // E708
    // VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_009_MT_V150.pdf/c268a447-11e3-ee1e-b4d5-8d83dd408401?t=1687353746900
    descripcion: z
      .string()
      .min(1)
      .max(2000)
      .describe(
        SDParser.stringify('E708', {
          v: 'https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_009_MT_V150.pdf/c268a447-11e3-ee1e-b4d5-8d83dd408401?t=1687353746900',
        }),
      ),

    // E709
    unidadMedida: z
      .nativeEnum(MeasurementUnit)
      .describe(SDParser.stringify('E709', { e: 'MeasurementUnit' })),

    // E711
    // VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_023_MT_V150.pdf/9580922b-5dd5-60f9-4857-ae66a757898f?t=1724956850006
    cantidad: z
      .number()
      .superRefine((value, ctx) => {
        new NumberLength(value, ctx).max(10).maxDecimals(8);
      })
      .describe(
        SDParser.stringify('E711', {
          v: 'https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_023_MT_V150.pdf/9580922b-5dd5-60f9-4857-ae66a757898f?t=1724956850006',
        }),
      ),

    // E712
    pais: CommonValidators.country()
      .optional()
      .describe(
        SDParser.stringify('E712', {
          e: 'Country',
        }),
      ),

    // E714
    observacion: z
      .string()
      .min(1)
      .max(500)
      .optional()
      .describe(SDParser.stringify('E714')),

    // E715
    tolerancia: z
      .nativeEnum(MerchandiseRelevance)
      .optional()
      .describe(SDParser.stringify('E715', { e: 'MerchandiseRelevance' })),

    // E717
    toleranciaCantidad: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).max(10).maxDecimals(4);
      })
      .describe(SDParser.stringify('E717')),

    // E718
    toleranciaPorcentaje: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).max(3).maxDecimals(8);
      })
      .describe(SDParser.stringify('E718')),

    // E719
    cdcAnticipo: z
      .string()
      .length(44)
      .optional()
      .describe(SDParser.stringify('E719')),

    // E8.1. Campos que describen el precio, tipo de cambio y valor total de la operación por ítem (E720-E729)
    monto: MontoSchema.optional().describe(
      SDParser.stringify('E8.1', {
        d: 'Campos que describen el precio, tipo de cambio y valor total de la operación por ítem (E720-E729)',
      }),
    ),

    // E8.2. Campos que describen el IVA de la operación por ítem (E730-E739)
    impuesto: ImpuestoSchema.optional().describe(
      SDParser.stringify('E8.2', {
        d: 'Campos que describen el IVA de la operación por ítem (E730-E739)',
      }),
    ),

    // E8.4. Grupo de rastreo de la mercadería (E750-E761)

    // E751
    lote: z
      .string()
      .min(1)
      .max(80)
      .optional()
      .describe(SDParser.stringify('E751')),

    // E752
    vencimiento: z.coerce
      .date()
      .optional()
      .transform((value) => {
        if (!value) return value;
        return DateHelper.getIsoDate(value);
      })
      .describe(SDParser.stringify('E752')),

    // E753
    numeroSerie: z
      .string()
      .min(1)
      .max(10)
      .optional()
      .describe(SDParser.stringify('E753')),

    // E754
    numeroPedido: z
      .string()
      .min(1)
      .max(20)
      .optional()
      .describe(SDParser.stringify('E754')),

    // E755
    numeroSeguimiento: z
      .string()
      .min(1)
      .max(20)
      .optional()
      .describe(SDParser.stringify('E755')),

    // E756, E757 y E758 (eliminados)
    // VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_010_MT_V150.pdf/d64a693b-6c63-86e1-ec6a-d4fe5ec4eeea?t=1687353747196

    // E759
    registroSenave: z
      .string()
      .length(20)
      .optional()
      .describe(SDParser.stringify('E759')),

    // E760
    registroEntidadComercial: z
      .string()
      .length(20)
      .optional()
      .describe(SDParser.stringify('E760')),

    // E761
    // VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_010_MT_V150.pdf/d64a693b-6c63-86e1-ec6a-d4fe5ec4eeea?t=1687353747196
    nombreProducto: z
      .string()
      .min(1)
      .max(30)
      .optional()
      .describe(
        SDParser.stringify('E761', {
          v: 'https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_010_MT_V150.pdf/d64a693b-6c63-86e1-ec6a-d4fe5ec4eeea?t=1687353747196',
        }),
      ),

    // E8.5. Sector de automotores nuevos y usados (E770-E789)
    sectorAutomotor: SectorAutomotorSchema.optional().describe(
      SDParser.stringify('E8.5', {
        d: 'Sector de automotores nuevos y usados (E770-E789)',
      }),
    ),
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
      paisDescripcion: dbService.countries._findByIdIfExist(data.pais, {
        ctx,
        fieldName: 'pais',
      })?.description,

      // E710
      unidadMedidaDescripcion: dbService.measurementUnits._findById(
        data.unidadMedida,
        {
          ctx,
          fieldName: 'unidadMedida',
        },
      ).representation,

      // E716
      toleranciaDescripcion: dbService.merchandiseRelevances._findByIdIfExist(
        data.tolerancia,
      )?.description,

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
