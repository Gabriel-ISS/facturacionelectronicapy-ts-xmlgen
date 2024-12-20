import { z } from 'zod';
import { IdentityDocumentReceptor } from '../../data/idDocsReceptors.table';
import { OperationType } from '../../data/operationTypes.table';
import { TaxpayerType } from '../../data/taxpayerTypes.table';
import { TaxpayerNotTaxpayer } from '../../data/taxpayerNotTaxpayer.table';
import CommonValidators from '../../helpers/validation/CommonValidators';

import ZodValidator from '../../helpers/validation/ZodValidator';
import dbService from '../../services/db.service';
import SDParser from '../../helpers/SDParser';

/** Campos que identifican al receptor del Documento Electrónico DE (D200-D299) */
export const ClienteSchema = z
  .object({
    // D201
    contribuyente: CommonValidators.taxpayer().describe(
      SDParser.stringify('D201'),
    ),

    // D202
    tipoOperacion: z
      .nativeEnum(OperationType)
      .describe(SDParser.stringify('D202', { e: 'OperationType' })),

    // D203
    pais: CommonValidators.country().describe(
      SDParser.stringify('D203', { e: 'Country' }),
    ),

    // D205
    tipoContribuyente: z
      .nativeEnum(TaxpayerType)
      .optional()
      .describe(SDParser.stringify('D205', { e: 'TaxpayerType' })),

    // para obtener D206 y D207
    ruc: CommonValidators.ruc().optional().describe(SDParser.stringify('D206')),

    // D208
    documentoTipo: z
      .nativeEnum(IdentityDocumentReceptor)
      .optional()
      .describe(SDParser.stringify('D208', { e: 'IdentityDocumentReceptor' })),

    // D209
    descripcionTipoDocumento: CommonValidators.identityDocDescription()
      .optional()
      .describe(SDParser.stringify('D209')),

    // D210
    documentoNumero: CommonValidators.identityDocNumber()
      .optional()
      .describe(SDParser.stringify('D210')),

    // D211
    razonSocial: CommonValidators.legalName().describe(
      SDParser.stringify('D211'),
    ),

    // D212
    nombreFantasia: CommonValidators.tradeName()
      .optional()
      .describe(SDParser.stringify('D212')),

    // D213
    direccion: CommonValidators.address()
      .optional()
      .describe(SDParser.stringify('D213')),

    // D214
    telefono: CommonValidators.tel().describe(SDParser.stringify('D214')),

    // D215
    celular: z
      .string()
      .min(10)
      .max(20)
      .optional()
      .describe(SDParser.stringify('D215')),

    // D216
    email: CommonValidators.email()
      .optional()
      .describe(SDParser.stringify('D216')),

    // D217
    codigo: CommonValidators.clientCode()
      .optional()
      .describe(SDParser.stringify('D217')),

    // D218
    numeroCasa: CommonValidators.houseNumber()
      .optional()
      .describe(SDParser.stringify('D218')),

    // D219
    departamento: CommonValidators.department()
      .optional()
      .describe(SDParser.stringify('D219', { e: 'Department' })),

    // D221
    distrito: CommonValidators.district()
      .optional()
      .describe(SDParser.stringify('D221', { t: 'distritos' })),

    // D223
    ciudad: CommonValidators.city()
      .optional()
      .describe(SDParser.stringify('D223', { t: 'ciudades' })),
  })
  .transform((data, ctx) => {
    const validator = new ZodValidator(ctx, data);

    CommonValidators.location(
      ctx,
      data.departamento,
      data.distrito,
      data.ciudad,
    );

    /**D201 = 1 */
    const isTaxpayer = data.contribuyente == TaxpayerNotTaxpayer.CONTRIBUYENTE;
    /**D201 = 2 */
    const isNotTaxpayer =
      data.contribuyente == TaxpayerNotTaxpayer.NO_CONTRIBUYENTE;
    /**D202 = 4 */
    const isB2F = data.tipoOperacion == OperationType.B2F;
    /**D208 = 5 */
    const isNameless =
      data.documentoTipo == IdentityDocumentReceptor.INNOMINADO;
    /**D208 = 9 */
    const isOther = data.documentoTipo == IdentityDocumentReceptor.OTRO;

    // D205 - tipoContribuyente
    {
      /*
      Obligatorio si D201 = 1
      No informar si D201 = 2
      */
      if (isTaxpayer) {
        validator.requiredField('tipoContribuyente');
      } else if (isNotTaxpayer) {
        validator.undesiredField('tipoContribuyente');
      }
    }

    // D206 - ruc
    {
      /*
      Obligatorio si D201 = 1
      No informar si D201 = 2
      */
      if (isTaxpayer) {
        validator.requiredField('ruc');
      } else if (isNotTaxpayer) {
        validator.undesiredField('ruc');
      }
    }

    // D208 - documentoTipo
    {
      /* 
      VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_023_MT_V150.pdf/9580922b-5dd5-60f9-4857-ae66a757898f?t=1724956850006
      Obligatorio si D201 = 2
      No informar si D201 = 1
      */
      if (isNotTaxpayer) {
        validator.requiredField('documentoTipo');
      } else if (isTaxpayer) {
        validator.undesiredField('documentoTipo');
      }
    }

    // D209 - descripcionTipoDocumento
    {
      /*
      Si D208 = 9 informar el tipo de
      documento de identidad del
      receptor
      */
      if (isOther) {
        validator.requiredField('descripcionTipoDocumento');
      } else {
        data.descripcionTipoDocumento =
          dbService.idDocsReceptors._findByIdIfExist(
            data.documentoTipo,
          )?.description;
      }
    }

    // D210 - documentoNumero
    {
      /*
      Obligatorio si D201 = 2 y D202 ≠ 4
      En caso de DE innominado, completar con 0 (cero)
      VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_002_MT_V150.pdf/b3656789-f42a-e578-4141-45046e452f41?t=1687353745841
      */
      if (isNotTaxpayer && !isB2F) {
        validator.requiredField('documentoNumero');
      }

      if (isNameless) {
        data.documentoNumero = '0';
      }
    }

    // D211 - razonSocial
    {
      /*
      En caso de ser innominado, completar con "Sin Nombre"
      */
      if (isNameless) {
        data.razonSocial = 'Sin Nombre';
      }
    }

    // D213 - dirección
    {
      /*
      Campo obligatorio cuando C002=7 (se valida en EDocSchema)
      o cuando D202=4
      */
      if (isB2F) {
        validator.requiredField('direccion');
      }
    }

    // D218 - numeroCasa
    {
      /*
      Campo obligatorio si se informa el campo D213
      */
      if (data.direccion) {
        validator.requiredField('numeroCasa');
      }
    }

    // D219 - departamento
    {
      /*
      No se debe informar cuando D202 = 4.
      VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_003_MT_V150.pdf/dd4689ee-164a-29b3-9c3f-44cbef55bcf5?t=1687353745998
      */
      if (isB2F) {
        validator.undesiredField('departamento');
      }
    }

    // D223 - ciudad
    {
      /*
      No se debe informar cuando D202 = 4
      VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_003_MT_V150.pdf/dd4689ee-164a-29b3-9c3f-44cbef55bcf5?t=1687353745998
      */
      if (isB2F) {
        validator.undesiredField('ciudad');
      }
    }

    const [rucID, rucDV] = data.ruc?.split('-') ?? [];

    return {
      ...data,

      // D204
      paisDescripcion: dbService.countries._findById(data.pais).description,

      // D206
      rucID: rucID as string | undefined,

      // D207
      rucDV: rucDV as string | undefined,

      // D220
      descripcionDepartamento: dbService.departments._findByIdIfExist(
        data.departamento,
      )?.description,

      // D222
      descripcionDistrito: dbService.districts._findByIdIfExist(data.distrito)
        ?.description,

      // D224
      descripcionCiudad: dbService.cities._findByIdIfExist(data.ciudad)
        ?.description,
    };
  });

export type Cliente = z.infer<typeof ClienteSchema>;
