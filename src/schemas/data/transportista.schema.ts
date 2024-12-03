import { z } from 'zod';
import { IdentityDocumentCarrier } from '../../data/idDocsCarriers.table';
import CommonValidators from '../../helpers/validation/CommonValidators';

import ZodValidator from '../../helpers/validation/ZodValidator';
import { AgenteSchema } from './agente.schema';
import { ChoferSchema } from './chofer.schema';
import dbService from '../../services/db.service';
import { TaxpayerNotTaxpayer } from '../../data/taxpayerNotTaxpayer.table';

/**E10.4. Campos que identifican al transportista (persona física o jurídica) (E980-E999) */
export const TransportistaSchema = z
  .object({
    // E981
    contribuyente: CommonValidators.taxpayer(),

    // E982
    nombre: CommonValidators.name(),

    // para obtener E983 y E984
    ruc: CommonValidators.ruc(),

    // E985
    documentoTipo: z.nativeEnum(IdentityDocumentCarrier).optional(),

    // E987
    documentoNumero: CommonValidators.identityDocNumber().optional(),

    // E988 (nacionalidad)
    pais: CommonValidators.country(),

    // E990 - E993 (excluyendo E992)
    chofer: ChoferSchema,

    // E992
    // VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_010_MT_V150.pdf/d64a693b-6c63-86e1-ec6a-d4fe5ec4eeea?t=1687353747196
    direccion: z.string().min(1).max(150),

    // E994 - E997
    agente: AgenteSchema.optional(),
  })
  .transform((data, ctx) => {
    const validator = new ZodValidator(ctx, data);

    /**E981 = 1 */
    const isTaxpayer = data.contribuyente == TaxpayerNotTaxpayer.CONTRIBUYENTE;
    /**E981 = 2 */
    const isNotTaxpayer =
      data.contribuyente == TaxpayerNotTaxpayer.NO_CONTRIBUYENTE;

    // E983 - ruc
    {
      /*
      Obligatorio si E981 = 1
      No informar si E981 ≠ 1
      */
      if (isTaxpayer) {
        validator.requiredField('ruc');
      } else {
        validator.undesiredField('ruc');
      }
    }

    // E985 - documentoTipo
    {
      /*
      Obligatorio si E981 = 2
      No informar si E981 = 1
      */
      if (isNotTaxpayer) {
        validator.requiredField('documentoTipo');
      } else if (isTaxpayer) {
        validator.undesiredField('documentoTipo');
      }
    }

    // E987 - documentoNumero
    {
      /*
      Obligatorio si existe el campo E985
      */
      if (data.documentoTipo) {
        validator.requiredField('documentoNumero');
      }
    }

    const [rucID, rucDV] = data.ruc.split('-');

    return {
      ...data,

      // E983
      rucID,

      // E984
      rucDV,

      // E986
      documentoTipoDescripcion: dbService
        .idDocsCarriers
        ._findByIdIfExist(data.documentoTipo)?.description,

      // E789
      paisDescripcion: dbService.countries._findById(data.pais),
    };
  });

export type Transportista = z.infer<typeof TransportistaSchema>;
