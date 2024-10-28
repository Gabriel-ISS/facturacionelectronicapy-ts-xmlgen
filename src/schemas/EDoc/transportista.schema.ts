import { z } from 'zod';
import { enumToZodUnion } from '../../helpers/zod.helpers';
import { IdentityDocumentCarriers } from '../../constants/identityDocumentsCarriers.constants';
import { ChoferSchema } from './chofer.schema';
import { AgenteSchema } from './agente.schema';

export const TransportistaSchema = z.object({
  // E980
  contribuyente: z.boolean(),

  // E982
  nombre: z.string(),

  // E983
  ruc: z.string(),

  // E985
  documentoTipo: z.union(enumToZodUnion(IdentityDocumentCarriers)).optional(),

  // E987
  documentoNumero: z.string().optional(),

  // E992
  direccion: z.string(),

  // E992
  obs: z.string().optional(),

  // E992
  pais: z.string().optional(),

  // E992
  paisDescripcion: z.string().optional(),

  // E992
  chofer: ChoferSchema,

  // E992
  agente: AgenteSchema.optional(),
}).superRefine((data, ctx) => {
  if (!data.contribuyente && !data.documentoTipo) {
    ctx.addIssue({
      path: ['documentoTipo'],
      message: 'El campo documentoTipo es requerido si no es contribuyente',
      code: z.ZodIssueCode.custom,
    });
  }

  if (data.documentoTipo && !data.documentoNumero) {
    ctx.addIssue({
      path: ['documentoNumero'],
      message: 'El campo documentoNumero es requerido si existe el campo documentoTipo.',
      code: z.ZodIssueCode.custom,
    });
  }
});

export type Transportista = z.infer<typeof TransportistaSchema>;