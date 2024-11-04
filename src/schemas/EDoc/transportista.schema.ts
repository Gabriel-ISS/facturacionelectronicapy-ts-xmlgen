import { z } from 'zod';
import { enumToZodUnion } from '../../helpers/validation/enumConverter';
import { IdentityDocumentCarriers } from '../../constants/identityDocumentsCarriers.constants';
import { ChoferSchema } from './chofer.schema';
import { AgenteSchema } from './agente.schema';
import ZodValidator from '../../helpers/validation/ZodValidator';
import { TaxpayerNotTaxpayer } from '../../constants/taxpayerNotTaxpayer.constants';

export const TransportistaSchema = z
  .object({
    // E981
    contribuyente: z
      .boolean()
      .transform((isTaxpayer) =>
        isTaxpayer
          ? TaxpayerNotTaxpayer.CONTRIBUYENTE
          : TaxpayerNotTaxpayer.NO_CONTRIBUYENTE,
      ),

    // E982
    nombre: z.string().min(4).max(60),

    // E983
    ruc: z.string().min(3).max(8),

    // E985
    documentoTipo: z.union(enumToZodUnion(IdentityDocumentCarriers)).optional(),

    // E987
    documentoNumero: z.string().optional(),

    // E992
    direccion: z.string().min(1).max(150),

    // TODO: SIN CÓDIGO
    /* obs: z.string().optional(), */

    // TODO: SIN CÓDIGO
    /* pais: z.string().optional(), */

    // TODO: SIN CÓDIGO
    /* paisDescripcion: z.string().optional(), */

    // E992
    chofer: ChoferSchema,

    // E992
    agente: AgenteSchema.optional(),
  })
  .superRefine((data, ctx) => {
    const validator = new ZodValidator(ctx, data);

    if (!data.contribuyente) {
      validator.undesiredField('ruc')
      validator.requiredField('documentoTipo');
    } else {
      validator.requiredField('ruc')
      validator.undesiredField('documentoTipo')
    }

    if (data.documentoTipo) {
      validator.requiredField('documentoNumero');
    }
  });

export type Transportista = z.infer<typeof TransportistaSchema>;
