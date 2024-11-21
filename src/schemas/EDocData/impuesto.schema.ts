import { z } from 'zod';
import { TaxRate } from '../../constants/taxRate.constants';
import { TaxTreatment } from '../../constants/taxTreatments.constants';
import ZodValidator from '../../helpers/validation/ZodValidator';
import dbService from '../../services/db.service';

/**E8.2. Campos que describen el IVA de la operación por ítem (E730-E739) */
export const ImpuestoSchema = z
  .object({
    // E731
    ivaTipo: z.nativeEnum(TaxTreatment),

    // E733
    proporcionGravada: z.number().min(0).max(100).optional(),

    // E734
    iva: z.nativeEnum(TaxRate),
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

      // E732
      ivaTipoDescripcion: dbService
        .select('taxTreatments')
        .findById(data.ivaTipo).description,
    };
  });

export type Impuesto = z.infer<typeof ImpuestoSchema>;
export type CompleteImpuesto = Impuesto & {
  /**E735 */
  ivaBase: number;

  /**E736 */
  liquidacionIvaPorItem: number;

  /**E737 */
  baseExentaIva: number;
};
