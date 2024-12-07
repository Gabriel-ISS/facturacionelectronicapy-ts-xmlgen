import { z } from 'zod';
import CommonValidators from '../../helpers/validation/CommonValidators';
import SDParser from '../../helpers/SDParser';

export const ChoferSchema = z.object({
  // E990
  documentoNumero: CommonValidators.identityDocNumber().describe(
    SDParser.stringify('E990'),
  ),

  // E991
  nombre: CommonValidators.name().describe(SDParser.stringify('E991')),

  // E993
  // VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_010_MT_V150.pdf/d64a693b-6c63-86e1-ec6a-d4fe5ec4eeea?t=1687353747196
  direccion: CommonValidators.address().describe(
    SDParser.stringify('E993', {
      v: 'https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_010_MT_V150.pdf/d64a693b-6c63-86e1-ec6a-d4fe5ec4eeea?t=1687353747196',
    }),
  ),
});

export type Chofer = z.infer<typeof ChoferSchema>;
