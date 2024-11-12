import { z } from 'zod';
import { IdentityDocumentReceptor } from '../../constants/identityDocumentsReceptors.constants';
import { OperationType } from '../../constants/operationTypes.constants';
import { DEFAULT_NAME } from '../../constants/other.constants';
import { Taxpayer } from '../../constants/taxpayer.constants';
import { TaxpayerNotTaxpayer } from '../../constants/taxpayerNotTaxpayer.constants';
import CommonValidators from '../../helpers/validation/CommonValidators';
import { enumToZodUnion } from '../../helpers/validation/enumConverter';
import ZodValidator from '../../helpers/validation/ZodValidator';
import dbService from '../../services/db.service';

/** Campos que identifican al receptor del Documento Electrónico DE (D200-D299) */
export const ClienteSchema = z
  .object({
    // D201
    contribuyente: CommonValidators.taxpayer(),

    // D202
    tipoOperacion: z.union(enumToZodUnion(OperationType)),

    // D203
    pais: CommonValidators.country(),

    // D205
    tipoContribuyente: z.union(enumToZodUnion(Taxpayer)).optional(),

    // para obtener D206 y D207
    ruc: CommonValidators.ruc().optional(),

    // D208
    documentoTipo: z.union(enumToZodUnion(IdentityDocumentReceptor)).optional(),

    // D210
    documentoNumero: CommonValidators.identityDocNumber().optional(),

    // D211
    razonSocial: z.string().min(4).max(255).default(DEFAULT_NAME),

    // D212
    nombreFantasia: z.string().min(4).max(255).optional(),

    // D213
    direccion: CommonValidators.address().optional(),

    // D214: TODO: Debe incluir el prefijo de la ciudad si D203 = PRY
    telefono: z.string().min(6).max(15).optional(),

    // D215
    celular: z.string().min(10).max(20).optional(),

    // D216
    email: z.string().email().min(3).max(80).optional(),

    // D217 TODO: INVESTIGAR, PORQUE  NO SE ESPECIFICA QUE ES
    codigo: z.string().min(3).max(15).optional(),

    // D218
    numeroCasa: CommonValidators.houseNumber().optional(),

    // D219
    departamento: CommonValidators.department().optional(),

    // D221
    distrito: CommonValidators.district().optional(),

    // D223
    ciudad: CommonValidators.city().optional(),
  })
  .transform((data, ctx) => {
    const validator = new ZodValidator(ctx, data);

    /**D201 = 1 */
    const isTaxpayer =
      data.contribuyente == TaxpayerNotTaxpayer.CONTRIBUYENTE;
    /**D201 = 2 */
    const isNotTaxpayer =
      data.contribuyente == TaxpayerNotTaxpayer.NO_CONTRIBUYENTE;
    /**D202 = 4 */
    const isB2F = data.tipoOperacion == OperationType.B2F;

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

    // D210 - documentoNumero
    {
      /*
      Obligatorio si D201 = 2 y D202 ≠ 4
      VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_002_MT_V150.pdf/b3656789-f42a-e578-4141-45046e452f41?t=1687353745841
      TODO: En caso de DE innominado, completar con 0 (cero)
      */
      if (isNotTaxpayer && !isB2F) {
        validator.requiredField('documentoNumero');
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
      TODO: Cuando D201 = 1, debe corresponder a lo declarado en el RUC
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

    const [rucID, rucDV] = data.ruc?.split('-') ?? []

    return {
      ...data,

      // D204
      paisDescripcion: dbService.select('countries').findById(data.pais)
        .description,

      // D206
      rucID,

      // D207
      rucDV,

      // D209
      descripcionTipoDocumento: dbService
        .select('identityDocumentsReceptors')
        .findByIdIfExist(data.documentoTipo)?.description,

      // D220
      descripcionDepartamento: dbService
        .select('departments')
        .findByIdIfExist(data.departamento)?.description,

      // D222
      descripcionDistrito: dbService
        .select('districts')
        .findByIdIfExist(data.distrito)?.description,

      // D224
      descripcionCiudad: dbService
        .select('cities')
        .findByIdIfExist(data.ciudad)?.description,
    };
  });

export type Cliente = z.infer<typeof ClienteSchema>;
