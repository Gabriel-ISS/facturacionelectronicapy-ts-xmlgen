import { z } from 'zod';
import { EDocumentType } from '../../data/eDocumentTypes.table';
import CommonValidators from '../../helpers/validation/CommonValidators';
import SDParser from '../../helpers/SDParser';

// GEI001
export const DisablingEventSchema = z
  .object({
    // GEI002
    timbrado: CommonValidators.timbrado().describe(
      SDParser.stringify('GEI002'),
    ),

    // GEI003
    establecimiento: CommonValidators.zeroPadToLength(3).describe(
      SDParser.stringify('GEI003'),
    ),

    // GEI004
    punto: CommonValidators.zeroPadToLength(3).describe(
      SDParser.stringify('GEI004'),
    ),

    // GEI005
    desde: CommonValidators.zeroPadToLength(7).describe(
      SDParser.stringify('GEI005'),
    ),

    // GEI006
    hasta: CommonValidators.zeroPadToLength(7).describe(
      SDParser.stringify('GEI006'),
    ),

    // GEI007
    tipoDocumento: z
      .nativeEnum(EDocumentType)
      .describe(SDParser.stringify('GEI007', { e: 'EDocumentType' })),

    // GEI008
    motivo: CommonValidators.motive().describe(SDParser.stringify('GEI008')),

    // GEI009
    serie: CommonValidators.serie()
      .optional()
      .describe(SDParser.stringify('GEI009')),
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
