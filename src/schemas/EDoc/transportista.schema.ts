import { z } from 'zod';
import { IdentityDocumentCarriers } from '../../constants/identityDocumentsCarriers.constants';
import CommonValidators from '../../helpers/validation/CommonValidators';
import { enumToZodUnion } from '../../helpers/validation/enumConverter';
import ZodValidator from '../../helpers/validation/ZodValidator';
import { AgenteSchema } from './agente.schema';
import { ChoferSchema } from './chofer.schema';
import dbService from '../../services/db.service';

/**E10.4. Campos que identifican al transportista (persona física o jurídica) (E980-E999) */
export const TransportistaSchema = z
  .object({
    // E981
    contribuyente: CommonValidators.taxpayer(),

    // E982
    nombre: CommonValidators.name(),

    // E983
    ruc: CommonValidators.ruc(),

    // E985
    documentoTipo: z.union(enumToZodUnion(IdentityDocumentCarriers)).optional(),

    // E987
    documentoNumero: CommonValidators.identityDocNumber().optional(),

    // E988 (nacionalidad)
    pais: CommonValidators.country(),

    // TODO: SIN CÓDIGO
    /* obs: z.string().optional(), */

    // E990 - E993 (excluyendo E992)
    chofer: ChoferSchema,

    // E992
    direccion: z.string().min(1).max(150),

    // E993: TODO

    // E994 - E997
    agente: AgenteSchema.optional(),
  })
  .transform((data, ctx) => {
    const validator = new ZodValidator(ctx, data);

    if (!data.contribuyente) {
      validator.undesiredField('ruc');
      validator.requiredField('documentoTipo');
    } else {
      validator.requiredField('ruc');
      validator.undesiredField('documentoTipo');
    }

    if (data.documentoTipo) {
      validator.requiredField('documentoNumero');
    }

    return {
      ...data,

      // E984: TODO: VERIFICAR SI EL RUC CONTIENE EL DIJITO
      digitoVerificadorRuc: data.ruc.split('-')[1],

      // E986
      documentoTipoDescripcion: dbService
        .select('identityDocumentsCarriers')
        .findByIdIfExist(data.documentoTipo)?.description,

      // E789
      paisDescripcion: dbService.select('countries').findById(data.pais),
    };
  });

export type Transportista = z.infer<typeof TransportistaSchema>;
