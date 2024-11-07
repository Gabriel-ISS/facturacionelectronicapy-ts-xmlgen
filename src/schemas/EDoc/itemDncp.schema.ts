import { z } from 'zod';
import CommonValidators from '../../helpers/validation/CommonValidators';
import ZodValidator from '../../helpers/validation/ZodValidator';

export const ItemDncpSchema = z
  .object({
    // E704
    codigoNivelGeneral: CommonValidators.zeroPadToLength(8).optional(),

    // E705
    codigoNivelEspecifico: z.string().min(3).max(4).optional(),

    // E706
    codigoGtinProducto: CommonValidators.gtinCode().optional(),

    // E707
    codigoNivelPaquete: CommonValidators.gtinCode().optional(),
  })
  .superRefine((data, ctx) => {
    const validator = new ZodValidator(ctx, data);

    // E705
    {
      /*
      Obligatorio si existe el campo E704
      */
      if (data.codigoNivelGeneral) {
        validator.requiredField('codigoNivelEspecifico');
      }
    }

  });

export type ItemDncp = z.infer<typeof ItemDncpSchema>;
