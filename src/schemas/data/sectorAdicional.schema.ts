import { z } from 'zod';
import NumberLength from '../../helpers/validation/NumberLenght';
import ZodValidator from '../../helpers/validation/ZodValidator';
import CommonValidators from '../../helpers/validation/CommonValidators';
import { Path } from '../../helpers/Path';

/**E9.5. Grupo de datos adicionales de uso comercial (E820-E829) */
export const SectorAdicionalSchema = z.object({
  // E821
  ciclo: z.string().min(1).max(15).optional(),
  
  // E822
  inicioCiclo: CommonValidators.isoDate().optional(),
  
  // E823
  finCiclo: CommonValidators.isoDate().optional(),
  
  // E824
  vencimientoPago: CommonValidators.isoDate().optional(),
  
  // E825
  numeroContrato: z.string().min(1).max(30).optional(),
  
  // E826
  saldoAnterior: z.number().optional().superRefine((value, ctx) => {
    if (value == undefined) return;
    new NumberLength(value, ctx).max(15).maxDecimals(4);
  }),

  // E827: VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_020_MT_V150.pdf/f9a47078-748e-db87-bf2f-e6826ef048b9?t=1700242734040
  codigoContratacionDncp: z.string().min(1).max(30).optional(),

}).superRefine((data, ctx) => {
  type Data = typeof data;
  const validator = new ZodValidator(ctx, data)
  
  // E822 - inicioCiclo
  {
    /*
    Obligatorio si se informa el campo E821
    No completar si no se informa el campo E821
    */
    if (data.ciclo) {
      validator.requiredField('inicioCiclo');
    } else {
      validator.undesiredField('inicioCiclo');
    }
  }

  // E823 - finCiclo
  {
    /*
    Obligatorio si se informa el campo E822
    No completar si no se informa el campo E822
    */
    if (data.inicioCiclo) {
      validator.requiredField('finCiclo');
    } else {
      validator.undesiredField('finCiclo');
    }
  }

  // ⚠️ esto no es del manual
  if (data.inicioCiclo && data.finCiclo) {
    const inicio = new Date(data.inicioCiclo);
    const fin = new Date(data.finCiclo);

    const endPath = new Path<Data>('finCiclo');

    validator.validate(
      'inicioCiclo',
      inicio > fin,
      `$path no puede ser mayor que '${endPath}'`,
    )
  }
});

export type SectorAdicional = z.infer<typeof SectorAdicionalSchema>;