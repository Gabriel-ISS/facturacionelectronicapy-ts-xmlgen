import { z } from 'zod';
import { Country } from '../../constants/countries.constants';
import { IdentityDocumentReceptor } from '../../constants/identityDocumentsReceptors.constants';
import { OperationType } from '../../constants/operationTypes.constants';
import { DEFAULT_NAME } from '../../constants/other.constants';
import { Taxpayer } from '../../constants/taxpayer.constants';
import { TaxpayerNotTaxpayer } from '../../constants/taxpayerNotTaxpayer.constants';
import CommonValidators from '../../helpers/validation/CommonValidators';
import { enumToZodUnion } from '../../helpers/validation/enumConverter';
import ZodValidator from '../../helpers/validation/ZodValidator';
import constantsService from '../../services/constants.service';
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

    // D206
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
  .transform((cliente, ctx) => {
    const validator = new ZodValidator(ctx, cliente);

    /**D201==1 */
    const isTaxpayer =
      cliente.contribuyente == TaxpayerNotTaxpayer.CONTRIBUYENTE;
    /**D201==2 */
    const isNotTaxpayer =
      cliente.contribuyente == TaxpayerNotTaxpayer.NO_CONTRIBUYENTE;
    /**D202==4 */
    const isB2F = cliente.tipoOperacion == OperationType.B2F;

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
      Obligatorio si D201 = 2 y D202 ≠ 4
      No informar si D201 = 1 o D202=4
      */
      if (isNotTaxpayer && !isB2F) {
        validator.requiredField('documentoTipo');
      } else if (isTaxpayer || isB2F) {
        validator.undesiredField('documentoTipo');
      }
    }

    // D210 - documentoNumero
    {
      /*
      Obligatorio si D201 = 2 y D202 ≠ 4
      No informar si D201 = 1 o D202=4
      */
      if (isNotTaxpayer && !isB2F) {
        validator.requiredField('documentoNumero');
      } else if (isTaxpayer || isB2F) {
        validator.undesiredField('documentoNumero');
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
      if (cliente.direccion) {
        validator.requiredField('numeroCasa');
      }
    }

    // D219 - departamento
    {
      /*
      Campo obligatorio si se informa el
      campo D213 y D202≠4, no se debe
      informar cuando D202 = 4.
      */
      if (cliente.direccion && !isB2F) {
        validator.requiredField('departamento');
      } else if (isB2F) {
        validator.undesiredField('departamento');
      }
    }

    // D223 - ciudad
    {
      /*
      Campo obligatorio si se informa el
      campo D213 y D202≠4, no se debe
      informar cuando D202 = 4
      */
      if (cliente.direccion && !isB2F) {
        validator.requiredField('ciudad');
      } else if (isB2F) {
        validator.undesiredField('ciudad');
      }
    }

    return {
      ...cliente,

      // D204
      paisDescripcion: dbService.select('countries').findById(cliente.pais)
        .description,

      // D207: TODO: VERIFICAR SI EL RUC CONTIENE EL DIJITO
      dijitoVerificadorRuc: cliente.ruc?.split('-')[1],

      // D209
      descripcionTipoDocumento: dbService
        .select('identityDocumentsReceptors')
        .findByIdIfExist(cliente.documentoTipo)?.description,

      // D220
      descripcionDepartamento: dbService
        .select('departments')
        .findByIdIfExist(cliente.departamento)?.description,

      // D222
      descripcionDistrito: dbService
        .select('districts')
        .findByIdIfExist(cliente.distrito)?.description,

      // D224
      descripcionCiudad: dbService
        .select('cities')
        .findByIdIfExist(cliente.ciudad)?.description,
    };
  });

export type Cliente = z.infer<typeof ClienteSchema>;
