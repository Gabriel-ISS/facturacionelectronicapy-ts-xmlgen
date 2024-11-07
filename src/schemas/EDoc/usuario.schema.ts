import { z } from 'zod';
import { UserIdentityDocument } from '../../constants/userIdentityDocuments.constants';
import CommonValidators from '../../helpers/validation/CommonValidators';
import { enumToZodUnion } from '../../helpers/validation/enumConverter';
import ZodValidator from '../../helpers/validation/ZodValidator';
import dbService from '../../services/db.service';

/** D2.2 Campos que identifican al responsable de la generación del DE (D140-D160) */
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
  .transform((data, ctx) => {
    const validator = new ZodValidator(ctx, data);

    // D141 - documentoTipoDescripcion
    {
      /*
      Si D141 = 9 informar el tipo de
      documento de identidad del
      responsable de la generación del DE
      */
      if (data.documentoTipo == UserIdentityDocument.OTRO) {
        validator.requiredField('documentoTipoDescripcion');
      } else {
        data.documentoTipoDescripcion = dbService
          .select('userIdentityDocuments')
          .findById(data.documentoTipo).description;
      }
    }

    return data;
  });

export type Usuario = z.infer<typeof UsuarioSchema>;
