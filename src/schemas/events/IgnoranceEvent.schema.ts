import { z } from 'zod';
import CommonValidators from '../../helpers/validation/CommonValidators';
import { TaxpayerNotTaxpayer } from '../../data/taxpayerNotTaxpayer.table';
import ZodValidator from '../../helpers/validation/ZodValidator';
import { IdentityDocumentCarrier } from '../../data/idDocsCarriers.table';
import { Path } from '../../helpers/Path';
import SDParser from '../../helpers/SDParser';

// GED001
export const IgnoranceEventSchema = z
  .object({
    // GED002
    cdc: CommonValidators.cdc().describe(SDParser.stringify('GED002')),

    // GED003
    fechaEmision: CommonValidators.isoDateTime().describe(
      SDParser.stringify('GED003'),
    ),

    // GED004
    fechaRecepcion: CommonValidators.isoDateTime().describe(
      SDParser.stringify('GED004'),
    ),

    // GED005
    contribuyente: CommonValidators.taxpayer().describe(
      SDParser.stringify('GED005'),
    ),

    // GED006
    nombre: CommonValidators.name().describe(SDParser.stringify('GED006')),

    // para calcular GED007 y GED008
    ruc: CommonValidators.ruc()
      .optional()
      .describe(SDParser.stringify('GED007 y GED008')),

    // GED009
    documentoTipo: z
      .nativeEnum(IdentityDocumentCarrier)
      .optional()
      .describe(SDParser.stringify('GED009', { e: 'IdentityDocumentCarrier' })),

    // GED010
    documentoNumero: CommonValidators.identityDocNumber()
      .optional()
      .describe(SDParser.stringify('GED010')),

    // GED011
    motivo: CommonValidators.motive()
      .optional()
      .describe(SDParser.stringify('GED011')),
  })
  .transform((data, ctx) => {
    type Data = typeof data;
    const validator = new ZodValidator(ctx, data);

    /**GED005=1 */
    const isTaxpayer = data.contribuyente == TaxpayerNotTaxpayer.CONTRIBUYENTE;
    /**GED005=2 */
    const isNotTaxpayer =
      data.contribuyente == TaxpayerNotTaxpayer.NO_CONTRIBUYENTE;

    // ⚠️ esto no esta en el manual
    {
      const emission = new Date(data.fechaEmision);
      const reception = new Date(data.fechaRecepcion);
      const receptionDatePath = new Path<Data>('fechaRecepcion');
      validator.validate(
        'fechaEmision',
        emission > reception,
        `$path no puede ser después de '${receptionDatePath}'`,
      );
    }

    // GED007 y GED008 - ruc
    {
      /*
      Requerido solo cuando el tipo de receptor
      es Contribuyente (GED005=1)
      No Informar si GED005=2
      */
      if (isTaxpayer) {
        validator.requiredField('ruc');
      } else if (isNotTaxpayer) {
        validator.undesiredField('ruc');
      }
    }

    // GED009 y GED010 - documentoTipo y documentoNumero
    {
      /*
      No Informar si GED005=1
      Requerido solo cuando el tipo de receptor
      es No Contribuyente (GED005=2)
      */
      if (isNotTaxpayer) {
        validator.requiredField('documentoTipo');
      } else if (isTaxpayer) {
        validator.undesiredField('documentoTipo');
      }
    }

    const [rucID, rucDV] = data.ruc?.split('-') ?? [];

    return {
      ...data,

      // GED007
      rucID: rucID as string | undefined,

      // GED008
      rucDV: rucDV as string | undefined,
    };
  });

export type IgnoranceEventInput = z.input<typeof IgnoranceEventSchema>;
