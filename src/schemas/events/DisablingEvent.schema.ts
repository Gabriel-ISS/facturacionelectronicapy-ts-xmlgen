import { z } from 'zod';
import {
  AllDocumentTypes
} from '../../constants/documentTypes.constants';
import CommonValidators from '../../helpers/validation/CommonValidators';


// GEI001
export const DisablingEventSchema = z
  .object({
    // GEI002
    timbrado: CommonValidators.timbrado(),

    // GEI003
    establecimiento: CommonValidators.zeroPadToLength(3),

    // GEI004
    punto: CommonValidators.zeroPadToLength(3),

    // GEI005
    desde: CommonValidators.zeroPadToLength(7),

    // GEI006
    hasta: CommonValidators.zeroPadToLength(7),

    // GEI007
    tipoDocumento: z.nativeEnum(AllDocumentTypes),

    // GEI008
    motivo: CommonValidators.motive(),

    // GEI009
    serie: CommonValidators.serie().optional(),
  })
  .superRefine((value, ctx) => {
    if (value.desde > value.hasta) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "El valor inicial en 'data.desde' debe ser inferior o igual al valor final en 'data.hasta'",
        path: ['desde'],
      });
    }
  });

export type DisablingEventInput = z.input<typeof DisablingEventSchema>;
