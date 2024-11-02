import { z } from 'zod';
import { UserIdentityDocument, userIdentityDocuments } from '../../constants/userIdentityDocuments.constants';
import { enumToZodUnion } from '../../helpers/zod.helpers';

export const UsuarioSchema = z
  .object({
    // D141
    documentoTipo: z.union(enumToZodUnion(UserIdentityDocument)),

    // D142
    documentoTipoDescripcion: z.string().min(9).max(41),
    // correccion david: no es opcional

    
    // D143
    documentoNumero: z.string().min(1).max(20),

    // D144
    nombre: z.string().min(4).max(255),
    
    // D145
    cargo: z.string().min(4).max(100),
  })
  .superRefine((user, ctx) => {
    if (user.documentoTipo == UserIdentityDocument.OTRO) {
      if (!user.documentoTipoDescripcion) {
        ctx.addIssue({
          path: ['documentoTipoDescripcion'],
          code: z.ZodIssueCode.custom,
          message: 'Debe proporcionar la descripción del documento',
        });
      }
    } else {
      const correctDescription = userIdentityDocuments.find(uid => uid.id == user.documentoTipo)?.description;
      if (correctDescription != user.documentoTipoDescripcion) {
        ctx.addIssue({
          path: ['documentoTipoDescripcion'],
          code: z.ZodIssueCode.custom,
          message: 'La descripción del documento no coincide con el codigo de documento',
        });
      }
    }
  });
export type Usuario = z.infer<typeof UsuarioSchema>;