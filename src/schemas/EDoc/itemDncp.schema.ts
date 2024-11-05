import { z } from 'zod';
import { enumToZodUnion } from '../../helpers/validation/enumConverter';
import { GtinCodes } from '../../constants/gtinCodes.constants';
import ZodValidator from '../../helpers/validation/ZodValidator';

export const ItemDncpSchema = z.object({
  // E704
  codigoNivelGeneral: z.number().optional().transform(value => {
    if (value == undefined) return value;
    return value.toString().padStart(8, '0');
  }),

  // E705
  codigoNivelEspecifico: z.string().min(3).max(4).optional(),

  // E706
  codigoGtinProducto: z.union(enumToZodUnion(GtinCodes)).optional(),

  // E707
  codigoNivelPaquete: z.union(enumToZodUnion(GtinCodes)).optional(),
}).superRefine((data, ctx) => {
  const validator = new ZodValidator(ctx, data);

  if (data.codigoNivelGeneral) {
    validator.requiredField('codigoNivelEspecifico');
  }
});

export type ItemDncp = z.infer<typeof ItemDncpSchema>;