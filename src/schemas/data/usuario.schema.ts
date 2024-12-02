import { z } from 'zod';
import { UserIdentityDocument } from '../../data/idDocsUsers.table';
import CommonValidators from '../../helpers/validation/CommonValidators';

import ZodValidator from '../../helpers/validation/ZodValidator';
import dbService from '../../services/db.service';

/** D2.2 Campos que identifican al responsable de la generación del DE (D140-D160) */
export const UsuarioSchema = z
  .object({
    // D141
    documentoTipo: z.nativeEnum(UserIdentityDocument),

    // D142
    documentoTipoDescripcion: z.string().min(9).max(41).optional(),

    // D143
    documentoNumero: CommonValidators.identityDocNumber(),

    // D144
    nombre: CommonValidators.name(),

    // D145
    cargo: z.string().min(4).max(100),
  })
  .transform((data, ctx) => {
    const validator = new ZodValidator(ctx, data);

    const isOtherDocument = data.documentoTipo == UserIdentityDocument.OTRO;

    // D141 - documentoTipoDescripcion
    {
      /*
      Si D141 = 9 informar el tipo de
      documento de identidad del
      responsable de la generación del DE
      */
      if (isOtherDocument) {
        validator.requiredField('documentoTipoDescripcion');
      }
    }

    return {
      ...data,
      documentoTipoDescripcion: !isOtherDocument
        ? dbService.idDocsUsers._findById(data.documentoTipo)
            .description
        : (data.documentoTipoDescripcion as string),
    };
  });

export type Usuario = z.infer<typeof UsuarioSchema>;
