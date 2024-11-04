import { z } from 'zod';
import { UserIdentityDocument, userIdentityDocuments } from '../../constants/userIdentityDocuments.constants';
import { enumToZodUnion } from '../../helpers/validation/enumConverter';
import ZodValidator from '../../helpers/validation/ZodValidator';
import dbService from '../../services/db.service';
import CommonValidators from '../../helpers/validation/CommonValidators';

export const UsuarioSchema = z
  .object({
    // D141
    documentoTipo: z.union(enumToZodUnion(UserIdentityDocument)),

    // D142
    documentoTipoDescripcion: z.string().min(9).max(41).optional(),
    
    // D143
    documentoNumero: CommonValidators.identityDocNumber(),

    // D144
    nombre: CommonValidators.name(),
    
    // D145
    cargo: z.string().min(4).max(100),
  })
  .transform((user, ctx) => {
    const validator = new ZodValidator(ctx, user);

    if (user.documentoTipo == UserIdentityDocument.OTRO) {
      validator.requiredField('documentoTipoDescripcion');
    } else {
      const identityDocument = dbService.select('userIdentityDocuments').findById(user.documentoTipo) 
      user.documentoTipoDescripcion = identityDocument?.description;
    }

    return user;
  });

export type Usuario = z.infer<typeof UsuarioSchema>;