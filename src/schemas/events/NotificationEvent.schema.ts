import { z } from 'zod';
import CommonValidators from '../../helpers/validation/CommonValidators';
import { IdentityDocumentCarriers } from '../../constants/identityDocumentsCarriers.constants';
import NumberLength from '../../helpers/validation/NumberLenght';
import { TaxpayerNotTaxpayer } from '../../constants/taxpayerNotTaxpayer.constants';
import ZodValidator from '../../helpers/validation/ZodValidator';
import { Path } from '../../helpers/Path';

// GEN001
export const NotificationEventSchema = z
  .object({
    // GEN002
    cdc: CommonValidators.cdc(),

    // GEN003
    fechaEmision: CommonValidators.isoDateTime(),

    // GEN004
    fechaRecepcion: CommonValidators.isoDateTime(),

    // GEN005
    contribuyente: CommonValidators.taxpayer(),

    // GEN006
    nombre: CommonValidators.name(),

    // para obtener GEN007 y GEN008
    ruc: CommonValidators.ruc().optional(),

    // GEN009
    documentoTipo: z.nativeEnum(IdentityDocumentCarriers).optional(),

    // GEN010
    documentoNumero: CommonValidators.identityDocNumber().optional(),

    // GEN011
    totalPYG: z.number().superRefine((value, ctx) => {
      new NumberLength(value, ctx).max(15).maxDecimals(8);
    }),
  })
  .transform((data, ctx) => {
    type Data = typeof data;
    const validator = new ZodValidator(ctx, data);

    // ⚠️ esto no esta en el manual
    {
      const emission = new Date(data.fechaEmision);
      const reception = new Date(data.fechaRecepcion);
      const receptionDatePath = new Path<Data>('fechaRecepcion')
      validator.validate(
        'fechaEmision',
        emission > reception,
        `$path no puede ser después de '${receptionDatePath}'`,
      )
    }

    /**GEN005 = 1 */
    const isTaxpayer = data.contribuyente == TaxpayerNotTaxpayer.CONTRIBUYENTE;
    /**GEN005 = 2 */
    const isNotTaxpayer =
      data.contribuyente == TaxpayerNotTaxpayer.NO_CONTRIBUYENTE;

    // GEN007 y GEN008 - ruc
    {
      /*
      Requerido solo cuando el tipo de receptor
      es Contribuyente (GEN005=1)
      No Informar si GEN005=2
      */
      if (isTaxpayer) {
        validator.requiredField('ruc');
      } else if (isNotTaxpayer) {
        validator.undesiredField('ruc');
      }
    }

    // GEN009 y GEN010 - documentoTipo y documentoNumero
    {
      /*
      No Informar si GEN005=1
      Requerido solo cuando el tipo de receptor
      es No Contribuyente (GEN005=2)
      */
      if (isNotTaxpayer) {
        validator.requiredField('documentoTipo');
        validator.requiredField('documentoNumero');
      } else if (isTaxpayer) {
        validator.undesiredField('documentoTipo');
        validator.undesiredField('documentoNumero');
      }
    }

    const [rucID, rucDV] = data.ruc?.split('-') ?? [];

    return {
      ...data,

      // GEN007
      rucID: rucID as string | undefined,

      // GEN008
      rucDV: rucDV as string | undefined,
    };
  });

export type NotificationEventInput = z.input<typeof NotificationEventSchema>;
