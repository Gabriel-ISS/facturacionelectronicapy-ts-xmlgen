import { z } from 'zod';
import { Country } from '../../constants/countries.constants';
import { OperationType } from '../../constants/operationTypes.constants';
import { TaxpayerNotTaxpayer } from '../../constants/taxpayerNotTaxpayer.constants';
import {
  enumToZodEnum,
  enumToZodUnion,
} from '../../helpers/validation/enumConverter';
import constantsService from '../../services/constants.service';
import { DEFAULT_NAME } from '../../constants/other.constants';
import { Taxpayer } from '../../constants/taxpayer.constants';
import { IdentityDocumentReceptor } from '../../constants/identityDocumentsReceptors.constants';
import CommonValidators from '../../helpers/validation/CommonValidators';
import NumberLength from '../../helpers/validation/NumberLenght';
import { Department } from '../../constants/departments.constants';
import ZodValidator from '../../helpers/validation/ZodValidator';

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

    // D214
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
  .superRefine((cliente, ctx) => {
    const validator = new ZodValidator(ctx, cliente);

    if (cliente.contribuyente == TaxpayerNotTaxpayer.CONTRIBUYENTE) {
      validator.requiredField('ruc');
      validator.requiredField('tipoContribuyente');
    } else if (cliente.tipoOperacion != OperationType.B2F) {
      // no es contribuyente y no es b2f
      validator.requiredField('documentoTipo');
      validator.requiredField('documentoNumero');
    }

    if (
      cliente.contribuyente == TaxpayerNotTaxpayer.CONTRIBUYENTE ||
      cliente.tipoOperacion == OperationType.B2F
    ) {
      // es contribuyente o es b2f
      validator.undesiredField('documentoTipo');
      validator.undesiredField('documentoNumero');
    }

    if (cliente.tipoOperacion == OperationType.B2F) {
      validator.requiredField('direccion');
    }

    if (cliente.direccion) {
      validator.requiredField('numeroCasa');

      if (cliente.contribuyente) {
        // TODO: cuando es contribuyente debe corresponder a lo declarado en el RUC
      }

      if (cliente.tipoOperacion != OperationType.B2F) {
        validator.requiredField('departamento');
        validator.requiredField('ciudad');
      } else {
        validator.undesiredField('departamento');
        validator.undesiredField('ciudad');
      }
    }

    if (cliente.telefono) {
      if (cliente.pais == Country.PARAGUAY) {
        // TODO: EL telefono debe incluir el prefijo de la ciudad
      }
    }

    // TODO: ESTA VALIDACIÓN ES CORRECTA?
    if (cliente.departamento && cliente.distrito && cliente.ciudad) {
      let errors: string[] = [];
      constantsService.validateLocation(
        'cliente',
        cliente.departamento,
        cliente.distrito,
        cliente.ciudad,
        errors,
      );
      // TODO: AGREGAR RUTAS EXACTAS
      errors.forEach((error) =>
        ctx.addIssue({
          path: ['direccion'],
          code: z.ZodIssueCode.custom,
          message: error,
        }),
      );
    }
  });

export type Cliente = z.infer<typeof ClienteSchema>;
