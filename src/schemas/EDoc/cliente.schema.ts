import { z } from 'zod';
import { Country } from '../../constants/countries.constants';
import { OperationType } from '../../constants/operationTypes.constants';
import { Receptor } from '../../constants/receptorTypes.constants';
import { enumToZodEnum, enumToZodUnion } from '../../helpers/zod.helpers';
import constantsService from '../../services/constants.service';
import { DEFAULT_NAME } from '../../constants/other.constants';
import { Taxpayer } from '../../constants/taxpayer.constants';
import { IdentityDocumentReceptor } from '../../constants/identityDocumentsReceptors.constants';

export const ClienteSchema = z
  .object({
    // D201
    contribuyente: z.boolean().transform(v => v ? Receptor.CONTRIBUYENTE : Receptor.NO_CONTRIBUYENTE),
    
    // D206
    ruc: z.string().min(3).max(8).optional(),
    
    // D211
    razonSocial: z.string().min(4).max(255).default(DEFAULT_NAME),
    
    // D212
    nombreFantasia: z.string().min(4).max(255).optional(),

    // D202
    tipoOperacion: z.union(enumToZodUnion(OperationType)),

    // D213
    direccion: z.string().min(1).max(255).optional(),

    // D218
    numeroCasa: z.number().min(1).max(999999).optional(),

    // D219
    departamento: z.number().min(1).max(99).optional(),

    // D221
    distrito: z.number().optional(),

    // D223
    ciudad: z.number().optional(),

    // D203
    pais: z.enum(enumToZodEnum(Country)),

    // D205
    tipoContribuyente: z.union(enumToZodUnion(Taxpayer)).optional(),

    // D208
    documentoTipo: z.union(enumToZodUnion(IdentityDocumentReceptor)).optional(),

    // D210
    documentoNumero: z.string().min(1).max(20).optional(),

    // D214
    telefono: z.string().min(6).max(15).optional(),

    // D215
    celular: z.string().min(10).max(20).optional(),

    // D216
    email: z.string().min(3).max(80).optional(),

    // D217 TODO: INVESTIGAR, PORQUE  NO SE ESPECIFICA QUE ES
    codigo: z.string().min(3).max(15).optional(),
  })
  .superRefine((cliente, ctx) => {
    if (cliente.contribuyente == Receptor.CONTRIBUYENTE) {
      if (!cliente.ruc) {
        ctx.addIssue({
          path: ['ruc'],
          code: z.ZodIssueCode.custom,
          message: 'Debe proporcionar el RUC si es Contribuyente',
        });
      }

      if (!cliente.tipoContribuyente) {
        ctx.addIssue({
          path: ['tipoContribuyente'],
          code: z.ZodIssueCode.custom,
          message:
            'Debe proporcionar el Tipo de Contribuyente si es Contribuyente',
        });
      }
    } else if (cliente.tipoOperacion != OperationType.B2F) {
      if (!cliente.documentoTipo) {
        ctx.addIssue({
          path: ['documentoTipo'],
          code: z.ZodIssueCode.custom,
          message:
            'Debe informar el Tipo de Documento si la operación no es B2F y no es contribuyente',
        });
      }

      if (!cliente.documentoNumero) {
        ctx.addIssue({
          path: ['documentoNumero'],
          code: z.ZodIssueCode.custom,
          message:
            'Debe informar el Número de Documento si la operación no es B2F y no es contribuyente',
        });
      }
    }

    if (cliente.tipoOperacion == OperationType.B2F) {
      if (!cliente.direccion) {        
        ctx.addIssue({
          path: ['direccion'],
          code: z.ZodIssueCode.custom,
          message: 'Debe informar la Dirección si el tipo de operación es B2F',
        });
      }

      if (cliente.departamento) {
        ctx.addIssue({
          path: ['departamento'],
          code: z.ZodIssueCode.custom,
          message: 'No debe informar el departamento si la operación es B2F',
        });
      }

      if (cliente.ciudad) {
        ctx.addIssue({
          path: ['ciudad'],
          code: z.ZodIssueCode.custom,
          message: 'No debe informar la ciudad si la operación es B2F',
        });
      }

      if (cliente.documentoTipo) {
        ctx.addIssue({
          path: ['documentoTipo'],
          code: z.ZodIssueCode.custom,
          message: 'No debe informar el tipo de documento si la operación es B2F',
        });
      }

      if (cliente.documentoNumero) {
        ctx.addIssue({
          path: ['documentoNumero'],
          code: z.ZodIssueCode.custom,
          message: 'No debe informar el número de documento si la operación es B2F',
        });
      }
    }

    if (cliente.direccion) {
      if (cliente.contribuyente) {
        // TODO: cuando es contribuyente debe corresponder a lo declarado en el RUC
      }

      if (!cliente.numeroCasa) {
        ctx.addIssue({
          path: ['numeroCasa'],
          code: z.ZodIssueCode.custom,
          message: 'Debe indicar el numero de casa',
        });
      }

      if (cliente.tipoOperacion != OperationType.B2F) {
        if (!cliente.departamento) {
          ctx.addIssue({
            path: ['departamento'],
            code: z.ZodIssueCode.custom,
            message: 'Debe informar el departamento si la operación no es B2F',
          });
        }

        if (!cliente.ciudad) {
          ctx.addIssue({
            path: ['ciudad'],
            code: z.ZodIssueCode.custom,
            message: 'Debe informar la ciudad si la operación no es B2B',
          });
        }
      }
    }

    if (cliente.telefono) {
      if (cliente.pais == Country.PARAGUAY) {
        // TODO: EL telefono debe incluir el prefijo de la ciudad
      }
    }

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