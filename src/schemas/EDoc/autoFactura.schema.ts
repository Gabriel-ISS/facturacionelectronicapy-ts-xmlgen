import { z } from 'zod';
import { Department } from '../../constants/departments.constants';
import { ValidIdentityDocument } from '../../constants/userIdentityDocuments.constants';
import { SellerNatureSelfInvoicing } from '../../constants/sellerNatureSelfInvoicingCases.constants';
import { enumToZodUnion } from '../../helpers/zod.helpers';
import { UbicacionSchema } from './ubicacion.schema';
import { IdentityDocumentCarriers } from '../../constants/identityDocumentsCarriers.constants';

export const AutoFacturaSchema = z.object({
  // E301
  tipoVendedor: z.union(enumToZodUnion(SellerNatureSelfInvoicing), {
    required_error: 'El tipo de vendedor es requerido',
  }),

  // E304
  documentoTipo: z.union(enumToZodUnion(IdentityDocumentCarriers), {
    required_error: 'El tipo de documento es requerido',
  }),

  // E306
  documentoNumero: z.string({
    required_error: 'El número de documento es requerido',
  }),

  // E307
  nombre: z.string({
    required_error: 'El nombre y apellido del vendedor son requeridos',
  }),

  // E308
  direccion: z.string({
    required_error: 'La dirección del vendedor es requerida',
  }),

  // E309
  numeroCasa: z
    .number({
      required_error: 'El número de casa es requerido',
    })
    .min(0, { message: 'El número de casa no puede ser menor que 0' }),

  // E310
  departamento: z.union(enumToZodUnion(Department), {
    required_error: 'El código del departamento es requerido',
  }),

  // E311
  departamentoDescripcion: z.string().optional(),

  // E312
  distrito: z
    .string({
      required_error: 'El código del distrito es requerido',
    })
    .describe('Código del distrito del vendedor'),

  // E313
  distritoDescripcion: z.string().optional(),

  // E314
  ciudad: z.string({
    required_error: 'El código de la ciudad es requerido',
  }),

  // E315
  ciudadDescripcion: z.string().optional(),

  ubicacion: UbicacionSchema,
});
export type AutoFactura = z.infer<typeof AutoFacturaSchema>;