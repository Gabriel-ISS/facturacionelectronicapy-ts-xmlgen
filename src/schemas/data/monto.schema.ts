import { z } from 'zod';
import NumberLength from '../../helpers/validation/NumberLenght';

/**E8.1. Campos que describen el precio, tipo de cambio y valor total de la operación por ítem (E720-E729) */
export const MontoSchema = z
  .object({
    // E721
    precioUnitario: z.number().superRefine((value, ctx) => {
      new NumberLength(value, ctx).max(15).maxDecimals(8);
    }),

    // E725
    cambio: z
      .number()
      .positive()
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
  })
  .transform((data, ctx) => {
    return {
      ...data,
      // EA004 y EA007 se declaran en EDocSchema
      // EA008, EA009, E735 y E736 se calculan en EDocSchema

      // EA003
      procentajeDescuentoPorItem:
        data.descuento && data.descuento > 0
          ? (data.descuento * 100) / data.precioUnitario
          : undefined,
    };
  });

export type Monto = z.infer<typeof MontoSchema>;
export type CompleteMonto = Monto & {
  /**EA004 */
  descuentoGlobalItem?: number;

  /**EA007 */
  anticipoGlobalItem?: number;

  /**EA008 */
  totalOperacion: number;

  /**EA009 */
  totalOperacionGuaranies: number;
};
