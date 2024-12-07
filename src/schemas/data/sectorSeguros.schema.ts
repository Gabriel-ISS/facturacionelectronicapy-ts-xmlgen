import { z } from 'zod';
import DateHelper from '../../helpers/DateHelper';
import NumberLength from '../../helpers/validation/NumberLenght';
import CommonValidators from '../../helpers/validation/CommonValidators';
import SDParser from '../../helpers/SDParser';

/**E9.3. Sector de Seguros (E800-E809) */
export const SectorSegurosSchema = z.object({
  // E801
  codigoAseguradora: z
    .string()
    .length(20)
    .optional()
    .describe(SDParser.stringify('E801')),

  // E9.3.1. Póliza de seguros (EA790-EA799)

  // EA791
  codigoPoliza: z.string().min(1).max(20).describe(SDParser.stringify('EA791')),

  // EA792
  vigenciaUnidad: z
    .string()
    .min(3)
    .max(15)
    .describe(SDParser.stringify('EA792')),

  // EA793
  vigencia: z
    .number()
    .superRefine((value, ctx) => {
      new NumberLength(value, ctx).max(5).decimalsLength(1);
    })
    .describe(SDParser.stringify('EA793')),

  // EA794
  numeroPoliza: z.string().min(1).max(25).describe(SDParser.stringify('EA794')),

  // EA795
  inicioVigencia: CommonValidators.isoDateTime()
    .optional()
    .describe(SDParser.stringify('EA795')),

  // EA796
  finVigencia: CommonValidators.isoDateTime()
    .optional()
    .describe(SDParser.stringify('EA796')),

  // EA797
  // VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_008_MT_V150.pdf/81fba389-0f27-e757-88c3-ec7b3dbab90b?t=1687353746734
  codigoInternoItem: z
    .string()
    .min(1)
    .max(50)
    .optional()
    .describe(
      SDParser.stringify('EA797', {
        v: 'https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_008_MT_V150.pdf/81fba389-0f27-e757-88c3-ec7b3dbab90b?t=1687353746734',
      }),
    ),
});

export type SectorSeguros = z.infer<typeof SectorSegurosSchema>;
